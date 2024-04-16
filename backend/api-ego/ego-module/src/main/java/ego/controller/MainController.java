package ego.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.geo.Point;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import ego.atv.BusStop;
import ego.model.Response;
import ego.model.Reward;
import ego.model.Route;
import ego.model.User;
import ego.repository.RewardRepository;
import ego.repository.RouteRepository;
import ego.repository.UserRepository;
import ego.util.UserService;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URISyntaxException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/ego")
public class MainController {

	//
	// Users operations

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // Create
    @PostMapping(path="/users/addUser")
    public ResponseEntity<Response<Boolean>> addNewUser(@RequestBody Map<String, String> userData, 
														@RequestParam(value = "file", required = false) MultipartFile profileImage) 
														throws URISyntaxException, ParseException {

		String email = userData.get("email");
		String password = userData.get("password");
		String passwordConfirm = userData.get("passwordConfirm");
		String name = userData.get("name");
		String surname = userData.get("surname");
    	Date birthDate = new SimpleDateFormat("yyyy-MM-dd").parse(userData.get("birthDate"));
		
		// Validate user data
		List<String> valid = userService.validateUserData(email, password, passwordConfirm, name, surname, birthDate);
		if (!valid.isEmpty()) {
            Response<Boolean> response = new Response<>(false, valid);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
		password = userService.encodePassword(password);
		
		// Convert profile image to byte array
		byte[] profileImageData = null;
		try {
			if (profileImage != null) {
				profileImageData = profileImage.getBytes();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		LocalDateTime registrationDate = LocalDateTime.now();

		Integer otp = userService.generateOtp();

		userService.sendVerificationEmail(email, otp);

		User newUser = new User(email, password, name, surname, birthDate, profileImageData, registrationDate, otp);
		userRepository.save(newUser);
		
		Response<Boolean> response = new Response<>(true);
        return ResponseEntity.ok(response);
	}

	@PostMapping(path="/users/validateUser")
	public ResponseEntity<Response<User>> validateUser(@RequestBody Map<String, String> requestData) {
		String email = requestData.get("email");
    	Integer otp = Integer.parseInt(requestData.get("otp"));

		
		User user = userRepository.findByEmail(email);
		
		if (user == null) {
			List<String> errors = new ArrayList<>();
			errors.add("Utente non trovato");
			Response<User> response = new Response<>(false, errors);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
		
		if (user.getActive()) {
			List<String> errors = new ArrayList<>();
			errors.add("Utente già attivo");
			Response<User> response = new Response<>(false, errors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
		
		if (user.getOtp().equals(otp)) {
			user.setActive(true);
			user.setOtp(null);
			userRepository.save(user);
			
			userService.writeSession(user);
			
			Response<User> response = new Response<>(true, user);
			return ResponseEntity.ok(response);
		} else {
			List<String> errors = new ArrayList<>();
			errors.add("OTP non valido");
			Response<User> response = new Response<>(false, errors);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
	}

    // Read
    @GetMapping("/users/getAllUsers")
    public ResponseEntity<Response<Iterable<User>>> getAllUsers() {
        Iterable<User> users = userRepository.findAll();
        Response<Iterable<User>> response = new Response<>(true, users);
        return ResponseEntity.ok(response);
    }

	@GetMapping(path="/users/getUser")
	public ResponseEntity<Response<User>> getUser(HttpSession session) {
		Object token = session.getAttribute("token");
		
		if (token != null) {
			String tokenString = token.toString();
			User user = userRepository.findUserByToken(tokenString);

			if (user != null) {
				Response<User> response = new Response<>(true, user);
				return ResponseEntity.ok(response);
			} else {
				Response<User> response = new Response<>(false, new ArrayList<>());
				response.setErrors("Utente non trovato");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
		} else {
			Response<User> response = new Response<>(false, new ArrayList<>());
			response.setErrors("Token non trovato nella sessione");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

    // Update
	@PutMapping(path="/users/updateUser")
	public ResponseEntity<Response<Boolean>> updateUser(@RequestBody Map<String, String> requestData,
														HttpSession session,
														@RequestParam(value = "file", required = false) MultipartFile profileImage) throws ParseException {


		Object token = session.getAttribute("token");
		if (token == null) {
			List<String> errors = new ArrayList<>();
			errors.add("Token non trovato nella sessione");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
		}

		User user = userRepository.findUserByToken(token.toString());
		if (user == null) {
			List<String> errors = new ArrayList<>();
			errors.add("Utente non trovato");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
		}

		String email = requestData.get("email");
		String password = requestData.get("password");
		String name = requestData.get("name");
		String surname = requestData.get("surname");
    	Date birthDate = new SimpleDateFormat("yyyy-MM-dd").parse(requestData.get("birthDate"));

		List<String> errors = new ArrayList<>();

		// Update only required parameters
		if (email != null) {
			if (userService.isValidEmail(email)) {
				if (!userRepository.existsByEmail(email))
					user.setEmail(email);
				else
					errors.add("Email già registrata");
			} else {
				errors.add("Formato email non valido");
			}
		}

		if (password != null) {
			if (userService.isValidPassword(password))
				user.setPassword(userService.encodePassword(password));
			else 
				errors.add("Password non valida");
		}

		if (name != null) {
			if (userService.isValidName(name))
				user.setName(name);
			else
				errors.add("Nome non valido");
		}

		if (surname != null) {
			if (userService.isValidSurname(surname))
				user.setSurname(surname);
			else
				errors.add("Cognome non valido");
		}

		if (birthDate != null) {
			if (userService.isValidBirthDate(birthDate))
				user.setBirthDate(birthDate);
			else
				errors.add("Data di nascita non valida");
		}

		if (profileImage != null) {
			byte[] profileImageData = null;
			try {
				profileImageData = profileImage.getBytes();
				user.setProfileImage(profileImageData);
			} catch (IOException e) {
				e.printStackTrace();
				errors.add("Errore nel salvataggio dell'immagine profilo");
			}
		}

		// Save user and create response
		userRepository.save(user);
		Response<Boolean> response;
		if (errors.isEmpty()) response = new Response<>(true);
		else response = new Response<>(false, errors);

		HttpStatus status = errors.isEmpty() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return ResponseEntity.status(status).body(response);
	}

    // Delete
	@DeleteMapping(path="/users/deleteUser")
	public ResponseEntity<Response<Boolean>> deleteUser(HttpSession session) {
		try {
			Object token = session.getAttribute("token");
			if (token == null) {
				List<String> errors = new ArrayList<>();
				errors.add("Token non trovato nella sessione");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
			}

			User user = userRepository.findUserByToken(token.toString());
			if (user == null) {
				List<String> errors = new ArrayList<>();
				errors.add("Utente non trovato");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
			}
			
			userRepository.delete(user);
			return ResponseEntity.ok(new Response<>(true));
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Utente non trovato");
			errors.add("Errore nell'eliminazione dell'utente: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}

	// Login
	@PostMapping(path="/users/login")
	public ResponseEntity<Response<Boolean>> loginUser(@RequestBody Map<String, String> requestData) {
		try {
			String email = requestData.get("email");
			String password = requestData.get("password");

			User user = userRepository.findByEmail(email);
			if (user != null) {
				if (userService.verifyPassword(password, user.getPassword())) {
					if (user.getActive()) {
						userService.writeSession(user);
						return ResponseEntity.ok(new Response<>(true));
					} else {
						List<String> errors = new ArrayList<>();
						errors.add("Account non confermato");
						return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response<>(false, errors));
					}
				} else {
					List<String> errors = new ArrayList<>();
					errors.add("Password errata");
					return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response<>(false, errors));
				}
			} else {
				List<String> errors = new ArrayList<>();
				errors.add("Email non trovata");
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response<>(false, errors));
			}
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Errore durante il login: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}

	// Logout
    @PostMapping(path="/users/logout")
    public ResponseEntity<Response<Boolean>> logoutUser() {
        userService.deleteSession();
        return ResponseEntity.ok(new Response<>(true));
    }

	@GetMapping("/users/checkSession")
	public ResponseEntity<Response<Boolean>> checkSession(HttpSession session) {
		Object user = session.getAttribute("token");
		boolean isAuthenticated = user != null;
		return ResponseEntity.ok(new Response<>(isAuthenticated));
	}
	

	//
	// Routes operations

	@Autowired
    private RouteRepository routeRepository;

	RestTemplate restTemplate = new RestTemplate();

	// Create
	@PostMapping("/routes/addRoute")
	public ResponseEntity<Response<Boolean>> addRoute(HttpSession session, @RequestBody Map<String, String> userData) {
		// controllare che active sia false a tutte, altrimenti ...............
		// prima di aggiungere una route voglio controllare che non ci siano delle route con active=true e se ci sono mettile false: 
		try {
			List<String> errors = new ArrayList<>();
			
			Object token = session.getAttribute("token");
			if (token == null) {
				errors.add("Token non trovato nella sessione");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
			}
			
			User user = userRepository.findUserByToken(token.toString());
			if (user == null) {
				errors.add("Utente non trovato");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
			}

			if (userData.get("startCoordinates") == null) {
				errors.add("endCoordinates non presente");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
			}
			
			String[] coordinatesArray = userData.get("startCoordinates").split(",");
			BigDecimal startLatitude = new BigDecimal(coordinatesArray[0]);
			BigDecimal startLongitude = new BigDecimal(coordinatesArray[1]);
			
			Point startPoint = new Point(startLatitude.doubleValue(), startLongitude.doubleValue());

			ResponseEntity<List<BusStop>> response = restTemplate.exchange(
				"http://localhost:8081/atv/getAllBusStops",
				HttpMethod.GET,
				null,
				new ParameterizedTypeReference<List<BusStop>>() {}
			);
			
			// Estrarre il corpo della risposta
			List<BusStop> allBusStops = response.getBody();

			// Verifica se la risposta è vuota o null
			if (allBusStops == null || allBusStops.isEmpty()) {
				// Nessuna fermata del bus trovata
				errors.add("Nessuna fermata del bus trovata dall'API");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
			}
			
			// Trova la fermata del bus più vicina entro 100 metri
			Map.Entry<BigDecimal, BigDecimal> nearestBusStop = findNearestBusStop(startLatitude, startLongitude, allBusStops);

			if (nearestBusStop == null) {
				errors.add("Nessuna fermata del bus trovata entro 100 metri dalle coordinate fornite");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
			}

			// Calcola la distanza tra la fermata del bus più vicina e il punto di partenza
			BigDecimal distanceToNearestBusStop = calculateDistance(startLatitude, startLongitude, nearestBusStop.getKey(), nearestBusStop.getValue());

			// Verifica se la distanza è inferiore a 100 metri
			if (distanceToNearestBusStop.compareTo(BigDecimal.valueOf(0.2)) > 0) {
				errors.add("La fermata del bus più vicina è oltre 200 metri di distanza");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
			}

			LocalDateTime startTime = LocalDateTime.now();

			Route route = new Route(startPoint, startTime, user);
			routeRepository.save(route);

			user.setActualPoints(user.getActualPoints() + 10);
			user.setTotalPoints(user.getTotalPoints() + 10);
			userRepository.save(user);

			return ResponseEntity.ok(new Response<>(true));
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Errore nell'inserimento del percorso: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}

	private Map.Entry<BigDecimal, BigDecimal> findNearestBusStop(BigDecimal startLatitude, BigDecimal startLongitude, List<BusStop> allBusStops) {
		if (allBusStops.isEmpty()) {
			return null;
		}
	
		// Inizializza la distanza minima con un valore molto grande
		BigDecimal minDistance = BigDecimal.valueOf(Double.MAX_VALUE);
		Map.Entry<BigDecimal, BigDecimal> nearestBusStop = null;
	
		// Itera su tutte le fermate dell'autobus per trovare quella più vicina
		for (BusStop busStop : allBusStops) {
			BigDecimal busStopLatitude = busStop.latitude;
			BigDecimal busStopLongitude = busStop.longitude;
	
			// Calcola la distanza euclidea tra la posizione di partenza e la fermata dell'autobus corrente
			BigDecimal distance = calculateDistance(startLatitude, startLongitude, busStopLatitude, busStopLongitude);
	
			// Aggiorna la distanza minima e la fermata dell'autobus più vicina se la distanza corrente è minore della distanza minima
			if (distance.compareTo(minDistance) < 0) {
				minDistance = distance;
				nearestBusStop = new AbstractMap.SimpleEntry<>(busStopLatitude, busStopLongitude);
			}
		}
	
		return nearestBusStop;
	}	
	
	private BigDecimal calculateDistance(BigDecimal lat1, BigDecimal lon1, BigDecimal lat2, BigDecimal lon2) {
		double earthRadius = 6371; // Raggio della Terra in chilometri
	
		// Converti le coordinate in radianti
		double lat1Rad = Math.toRadians(lat1.doubleValue());
		double lon1Rad = Math.toRadians(lon1.doubleValue());
		double lat2Rad = Math.toRadians(lat2.doubleValue());
		double lon2Rad = Math.toRadians(lon2.doubleValue());
	
		// Calcola le differenze di latitudine e longitudine
		double dLat = lat2Rad - lat1Rad;
		double dLon = lon2Rad - lon1Rad;
	
		// Calcola la distanza utilizzando la formula della distanza euclidea
		double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
				+ Math.cos(lat1Rad) * Math.cos(lat2Rad)
				* Math.sin(dLon / 2) * Math.sin(dLon / 2);
		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		double distance = earthRadius * c;
	
		return BigDecimal.valueOf(distance);
	}	


	// Read
	@GetMapping("/routes/getAllRoutes")
	public ResponseEntity<Response<List<Route>>> getAllRoutes() {
		Iterable<Route> routesIterable = routeRepository.findAll();
		List<Route> routesList = new ArrayList<>();
		routesIterable.forEach(routesList::add);
		return ResponseEntity.ok(new Response<>(true, routesList));
	}

	@GetMapping("/routes/getRoutesOfUser")
	public ResponseEntity<Response<List<Route>>> getRoutesByUserId(HttpSession session) {
		try {
			Object token = session.getAttribute("token");
			if (token == null) {
				List<String> errors = new ArrayList<>();
				errors.add("Token non trovato nella sessione");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
			}
			
			User user = userRepository.findUserByToken(token.toString());
			if (user == null) {
				List<String> errors = new ArrayList<>();
				errors.add("Utente non trovato");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
			} else {
				List<Route> routes = routeRepository.findByUserId(user.getId());
				return ResponseEntity.ok(new Response<>(true, routes));
			}
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Errore nella ricerca dei percorsi: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}

	// Update
	@PutMapping("/routes/endRoute")
	public ResponseEntity<Response<Boolean>> endRoute(HttpSession session, @RequestBody Map<String, String> userData) {
		List<String> errors = new ArrayList<>();

		Object token = session.getAttribute("token");
		if (token == null) {
			errors.add("Token non trovato nella sessione");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
		}

		User user = userRepository.findUserByToken(token.toString());
		if (user == null) {
			errors.add("Utente non trovato");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
		}

		Route route = routeRepository.findActiveRouteByUserId(user.getId()).orElse(null);
		if (route == null) {
			errors.add("Nessun percorso attivo trovato");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
		}

		if (userData.get("endCoordinates") == null) {
			errors.add("endCoordinates non presente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
		}

		String[] coordinatesArray = userData.get("endCoordinates").split(",");
		BigDecimal endLatitude = new BigDecimal(coordinatesArray[0]);
		BigDecimal endLongitude = new BigDecimal(coordinatesArray[1]);

		// Controlla se il tempo trascorso è maggiore di 50 minuti
		LocalDateTime endTime = LocalDateTime.now();
		LocalDateTime startTime = route.getStartTime();
		long minutesElapsed = ChronoUnit.MINUTES.between(startTime, endTime);
		if (minutesElapsed > 50) {
			errors.add("Il tempo trascorso tra l'inizio e la fine della route è maggiore di 50 minuti");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
		}

		ResponseEntity<List<BusStop>> response = restTemplate.exchange(
			"http://localhost:8081/atv/getAllBusStops",
			HttpMethod.GET,
			null,
			new ParameterizedTypeReference<List<BusStop>>() {}
		);

		List<BusStop> allBusStops = response.getBody();

		if (allBusStops == null || allBusStops.isEmpty()) {
			errors.add("Nessuna fermata del bus trovata dall'API");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
		}

		// Trova la fermata del bus più vicina
		Map.Entry<BigDecimal, BigDecimal> nearestBusStop = findNearestBusStop(endLatitude, endLongitude, allBusStops);
		if (nearestBusStop != null) {
			BigDecimal distanceToNearestBusStop = calculateDistance(endLatitude, endLongitude, nearestBusStop.getKey(), nearestBusStop.getValue());

			// Controlla la distanza rispetto alla fermata del bus più vicina
			if (distanceToNearestBusStop.compareTo(BigDecimal.valueOf(0.05)) <= 0) { // Meno di 50 metri
				// Aggiorna la route con la posizione finale e il tempo finale
				route.setEndCoordinates(new Point(endLatitude.doubleValue(), endLongitude.doubleValue()));
				route.setEndTime(LocalDateTime.now());
				route.setActive(false);
				routeRepository.save(route);

				user.setActualPoints(user.getActualPoints() + 10);
				user.setTotalPoints(user.getTotalPoints() + 10);
				userRepository.save(user);

				return ResponseEntity.ok(new Response<>(true));
			}
		} 

		// Se non è stata soddisfatta nessuna delle condizioni precedenti, restituisci un errore
		errors.add("La route non si trova vicino a una fermata del bus entro 50 metri");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
	}

	// Delete
	@DeleteMapping("/routes/deleteRoute")
	public ResponseEntity<Response<Boolean>> deleteRoute(@RequestBody Map<String, String> userData) {
		try {
			String idStr = userData.get("id");
			if (idStr == null) {
				List<String> errors = new ArrayList<>();
				errors.add("Id non presente");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
			}
			Integer id = Integer.parseInt(idStr);

			Route route = routeRepository.findById(id).orElse(null);
			if (route != null) {
				routeRepository.delete(route);
				return ResponseEntity.ok(new Response<>(true));
			} else {
				List<String> errors = new ArrayList<>();
				errors.add("Percorso non trovato");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
			}
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Errore nell'eliminazione del percorso: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}

	//
	// Rewards operations



	@Autowired
    private RewardRepository rewardRepository;

    // Create
	@PostMapping("/rewards/addReward")
	public ResponseEntity<Response<Boolean>> addReward(@RequestBody Map<String, String> userData) {
		try {
			
			String company = userData.get("company");
			String discountPercentageStr = userData.get("discountPercentage");
			String requiredPointsStr = userData.get("requiredPoints");
			String url = userData.get("url");

			if (company == null || discountPercentageStr == null || requiredPointsStr == null || url == null) {
				List<String> errors = new ArrayList<>();
				errors.add("Uno o più campi mancanti nella richiesta");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
			}

			double discountPercentage = Double.parseDouble(discountPercentageStr);
			int requiredPoints = Integer.parseInt(requiredPointsStr);

			Reward reward = new Reward(company, discountPercentage, requiredPoints, url);
			rewardRepository.save(reward);
			return ResponseEntity.ok(new Response<>(true));
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Errore nell'aggiunte della ricompensa: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}

	// Read
	@GetMapping("/rewards/getAllRewards")
	public ResponseEntity<Response<List<Reward>>> getAllRewards() {
		try {
			Iterable<Reward> rewardsIterable = rewardRepository.findAll();
			List<Reward> rewardsList = new ArrayList<>();
			rewardsIterable.forEach(rewardsList::add);
			return ResponseEntity.ok(new Response<>(true, rewardsList));
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Errore nella riceerca delle ricompense: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}

	// Update
	@PutMapping("/rewards/updateReward")
	public ResponseEntity<Response<Reward>> updateReward(@RequestBody Map<String, String> userData) {
		try {
			String idStr = userData.get("id");

			if (idStr == null) {
				List<String> errors = new ArrayList<>();
				errors.add("Id non presente");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
			}

			int id = Integer.parseInt(idStr);

			Reward reward = rewardRepository.findById(id)
											.orElseThrow(() -> new RuntimeException("Ricompensa non trovata"));

			// Update only required parameters
			if (userData.get("company") != null) {
				reward.setCompany(userData.get("company"));
			}
			if (userData.get("discountPercentage") != null) {
				reward.setDiscountPercentage(Integer.parseInt(userData.get("discountPercentage")));
			}
			if (userData.get("url") != null) {
				reward.setUrl(userData.get("url"));
			}
			if (userData.get("requiredPoints") != null) {
				reward.setRequiredPoints(Integer.parseInt(userData.get("requiredPoints")));
			}

			rewardRepository.save(reward);
			return ResponseEntity.ok(new Response<>(true));
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Errore durante l'aggiornamento della ricompensa: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}

	// Delete
	@DeleteMapping("/rewards/deleteReward")
	public ResponseEntity<Response<Boolean>> deleteReward(@RequestBody Map<String, String> userData) {
		try {
			String idStr = userData.get("id");

			if (idStr == null) {
				List<String> errors = new ArrayList<>();
				errors.add("Id non presente");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
			}

			int id = Integer.parseInt(idStr);

			Reward reward = rewardRepository.findById(id)
											.orElseThrow(() -> new RuntimeException("Ricompensa non trovata"));
			rewardRepository.delete(reward);
			return ResponseEntity.ok(new Response<>(true));
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Errore durante l'eliminazione della ricompensa: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}

	@GetMapping("/users/getUserAverageCO2Savings")
	public ResponseEntity<Response<Map<String, BigDecimal>>> getAverageCO2Savings(HttpSession session) {
		try {
			List<String> errors = new ArrayList<>();

			Object token = session.getAttribute("token");
			if (token == null) {
				errors.add("Token non trovato nella sessione");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<>(false, errors));
			}

			User user = userRepository.findUserByToken(token.toString());
			if (user == null) {
				errors.add("Utente non trovato");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
			}

			// Ottieni tutte le route dell'utente con active=false
			List<Route> routes = routeRepository.findByUserAndActiveFalse(user);

			Map<String, BigDecimal> monthlyCO2Savings = new HashMap<>();

			// Suddividi le route per mese e calcola il risparmio di CO2 per ogni mese
			for (Route route : routes) {
				LocalDateTime startTime = route.getStartTime();
				String month = startTime.getMonth().toString();

				BigDecimal distance = calculateDistance(
					BigDecimal.valueOf(route.getStartCoordinates().getX()),
					BigDecimal.valueOf(route.getStartCoordinates().getY()),
					BigDecimal.valueOf(route.getEndCoordinates().getX()),
					BigDecimal.valueOf(route.getEndCoordinates().getY())
				);

				BigDecimal co2Saved = calculateCO2Savings(distance);

				if (!monthlyCO2Savings.containsKey(month)) {
					monthlyCO2Savings.put(month, co2Saved);
				} else {
					BigDecimal totalCO2Saved = monthlyCO2Savings.get(month);
					monthlyCO2Savings.put(month, totalCO2Saved.add(co2Saved));
				}
			}

			// Calcola la media del risparmio di CO2 per ogni mese
			Map<String, BigDecimal> averageMonthlyCO2Savings = new HashMap<>();
			for (Map.Entry<String, BigDecimal> entry : monthlyCO2Savings.entrySet()) {
				BigDecimal totalCO2Saved = entry.getValue();
				int totalRoutes = routes.size();
				BigDecimal averageCO2Savings = BigDecimal.ZERO;
				if (totalRoutes > 0) {
					averageCO2Savings = totalCO2Saved.divide(BigDecimal.valueOf(totalRoutes), 2, RoundingMode.HALF_UP);
				}
				averageMonthlyCO2Savings.put(entry.getKey(), averageCO2Savings);
			}

			return ResponseEntity.ok(new Response<>(true, averageMonthlyCO2Savings));
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Errore nel calcolo della media del risparmio di CO2: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}
	
	private BigDecimal calculateCO2Savings(BigDecimal distance) {
		// Assumiamo un tasso di emissione di CO2 per chilometro per l'autobus e per l'auto
		BigDecimal busCO2Km = BigDecimal.valueOf(0.1); // 0,069 kg/km - autobus
		BigDecimal carCO2Km = BigDecimal.valueOf(0.2); // 0,118 kg/km - auto
	
		// Calcola il risparmio di CO2 confrontando il viaggio in autobus con il viaggio in auto
		BigDecimal busCO2 = busCO2Km.multiply(distance);
		BigDecimal carCO2 = carCO2Km.multiply(distance);
		BigDecimal CO2Savings = carCO2.subtract(busCO2);
	
		return CO2Savings;
	}	


	
	// Users/Rewards operations
	// to do → if user have tot points************************************************************************************
}