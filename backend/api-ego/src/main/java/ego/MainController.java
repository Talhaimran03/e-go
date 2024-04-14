package ego;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.nio.file.Path;

@RestController
@RequestMapping(path="/ego")
public class MainController {

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
			if (profileImage == null) {
				String defaultImagePath = "/img/default_profile.png";
				java.net.URL resourceUrl = getClass().getResource(defaultImagePath);
				Path path = Paths.get(resourceUrl.toURI());
				profileImageData = Files.readAllBytes(path);
			} else {
				profileImageData = profileImage.getBytes();
			}
		} catch (IOException | URISyntaxException e) {
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
			
			userService.writeSession();
			
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

	@GetMapping(path="/users/getUserById")
	public ResponseEntity<Response<User>> getUserById(HttpServletRequest request) {
		HttpSession session = request.getSession(false); // Get session, but not create a new one
		if (session != null) {
			Integer userId = (Integer) session.getAttribute("userId");
			if (userId != null) {
				Optional<User> userOptional = userRepository.findById(userId);
				if (userOptional.isPresent()) {
					Response<User> response = new Response<>(true, userOptional.get());
					return ResponseEntity.ok(response);
				} else {
					Response<User> response = new Response<>(false, new ArrayList<>());
					response.setErrors("Utente non trovato");
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
				}
			} else {
				Response<User> response = new Response<>(false, new ArrayList<>());
				response.setErrors("Id utente non trovato nella sessione");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
			}
		} else {
			Response<User> response = new Response<>(false, new ArrayList<>());
			response.setErrors("Sessione non trovata");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

    // Update
	@PutMapping(path="/users/updateUser")
	public ResponseEntity<Response<Boolean>> updateUser(@RequestBody Integer id,
														@RequestBody(required = false) String email,
														@RequestBody(required = false) String password,
														@RequestBody(required = false) String name,
														@RequestBody(required = false) String surname,
														@RequestBody(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date birthDate,
														@RequestBody(required = false) MultipartFile profileImage,
														@RequestBody(required = false) Boolean active,
														@RequestBody(required = false) Integer points) {
		
		User user = userRepository.findById(id).orElse(null);
		if (user == null) {
			List<String> errors = new ArrayList<>();
			errors.add("Utente non trovato");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
		}

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

		if (active != null) user.setActive(active);
		if (points != null) user.setPoints(points);

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
	public ResponseEntity<Response<Boolean>> deleteUser(@RequestBody Integer id) {
		try {
			User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Utente non trovato"));
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
						userService.writeSession();
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
	
	// Routes operations

	@Autowired
    private RouteRepository routeRepository;

	// Create
	@PostMapping("/routes/addRoute")
	public ResponseEntity<Response<Boolean>> addRoute(@RequestBody Point startCoordinates, @RequestBody Integer userId) {
		try {
			User user = userRepository.findById(userId).orElse(null);
			if (user != null) {
				LocalDateTime startTime = LocalDateTime.now();
				Route route = new Route(startCoordinates, startTime, user);
				routeRepository.save(route);

				user.setPoints(user.getPoints() + 10);
				userRepository.save(user);

				return ResponseEntity.ok(new Response<>(true));
			} else {
				List<String> errors = new ArrayList<>();
				errors.add("Utente non trovato");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
			}
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Errore nell'inserimento del percorso: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}

	// Read
	@GetMapping("/routes/getAllRoutes")
	public ResponseEntity<Response<List<Route>>> getAllRoutes() {
		Iterable<Route> routesIterable = routeRepository.findAll();
		List<Route> routesList = new ArrayList<>();
		routesIterable.forEach(routesList::add);
		return ResponseEntity.ok(new Response<>(true, routesList));
	}

	@GetMapping("/routes/getRoutesByUserId")
	public ResponseEntity<Response<List<Route>>> getRoutesByUserId(@RequestBody Integer userId) {
		try {
			User user = userRepository.findById(userId).orElse(null);
			if (user != null) {
				List<Route> routes = routeRepository.findByUserId(userId);
				return ResponseEntity.ok(new Response<>(true, routes));
			} else {
				List<String> errors = new ArrayList<>();
				errors.add("Utente non trovato");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
			}
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Errore nella ricerca dei percorsi: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}

	// Update
	@PutMapping("/routes/updateRoute")
	public ResponseEntity<Response<Boolean>> updateRoute(@RequestBody Integer id,
														 @RequestBody(required = false) Point startCoordinates,
														 @RequestBody(required = false) LocalDateTime startTime,
														 @RequestBody(required = false) Point endCoordinates,
														 @RequestBody(required = false) LocalDateTime endTime,
														 @RequestBody(required = false) Integer userId) {
		Route route = routeRepository.findById(id).orElse(null);
		if (route == null) {
			List<String> errors = new ArrayList<>();
			errors.add("Percorso non trovato");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
		}

		List<String> errors = new ArrayList<>();

		// Update only required parameters
		if (startCoordinates != null) {
			route.setStartCoordinates(startCoordinates);
		}
		if (startTime != null) {
			route.setStartTime(startTime);
		}
		if (endCoordinates != null) {
			route.setEndCoordinates(endCoordinates);
		}
		if (endTime != null) {
			route.setEndTime(endTime);
		}
		if (userId != null) {
			User user = userRepository.findById(userId).orElse(null);
			if (user != null) {
				route.setUser(user);
			} else {
				errors.add("Utente non trovato");
			}
		}

		routeRepository.save(route);

		Response<Boolean> response;
		if (errors.isEmpty()) {
			response = new Response<>(true);
		} else {
			response = new Response<>(false, errors);
		}

		HttpStatus status = errors.isEmpty() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
		return ResponseEntity.status(status).body(response);
	}

	// Delete
	@DeleteMapping("/routes/deleteRoute")
	public ResponseEntity<Response<Boolean>> deleteRoute(@RequestBody Integer id) {
		try {
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
	

	// Rewards operations

	@Autowired
    private RewardRepository rewardRepository;

    // Create
	@PostMapping("/rewards/addReward")
	public ResponseEntity<Response<Boolean>> addReward(@RequestBody String company,
													   @RequestBody double discountPercentage,
													   @RequestBody Integer requiredPoints,
													   @RequestBody String url) {
		try {
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
	public ResponseEntity<Response<Reward>> updateReward(@RequestBody Integer id, 
														 @RequestBody(required = false) String company,
														 @RequestBody(required = false) Double discountPercentage,
														 @RequestBody(required = false) String url) {
		try {
			Reward reward = rewardRepository.findById(id)
											.orElseThrow(() -> new RuntimeException("Ricompensa non trovata"));

			// Update only required parameters
			if (company != null) {
				reward.setCompany(company);
			}
			if (discountPercentage != null) {
				reward.setDiscountPercentage(discountPercentage);
			}
			if (url != null) {
				reward.setUrl(url);
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
	public ResponseEntity<Response<Boolean>> deleteReward(@RequestBody Integer id) {
		try {
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


	//
	// Users/Rewards operations

	@GetMapping("/users/getRewardsByUserId")
	public ResponseEntity<Response<List<Reward>>> getRewardsByUserId(@RequestBody Integer userId) {
		try {
			List<Reward> rewards = rewardRepository.findByUserId(userId);
			if (!rewards.isEmpty()) {
				return ResponseEntity.ok(new Response<>(true, rewards));
			} else {
				List<String> errors = new ArrayList<>();
				errors.add("Nessuna ricompensa trovata per l'utente con ID: " + userId);
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, errors));
			}
		} catch (Exception e) {
			List<String> errors = new ArrayList<>();
			errors.add("Errore nel recupero delle ricompense: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
		}
	}

	@PutMapping("/users/linkReward")
    public ResponseEntity<Response<Boolean>> linkUserToReward(@RequestBody Integer userId, @RequestBody Integer rewardId) {
        try {
            User user = userRepository.findById(userId)
                                       .orElseThrow(() -> new RuntimeException("Utente non trovato"));

            Reward reward = rewardRepository.findById(rewardId)
                                             .orElseThrow(() -> new RuntimeException("Ricompensa non trovata"));

            user.getRewards().add(reward);
            userRepository.save(user);

            return ResponseEntity.ok(new Response<>(true));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Errore durante il collegamento dell'utente alla ricompensa: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
        }
    }

    @DeleteMapping("/users/unlinkReward")
    public ResponseEntity<Response<Boolean>> unlinkUserFromReward(@RequestBody Integer userId, @RequestBody Integer rewardId) {
        try {
            User user = userRepository.findById(userId)
                                       .orElseThrow(() -> new RuntimeException("Utente non trovato"));

            Reward reward = rewardRepository.findById(rewardId)
                                             .orElseThrow(() -> new RuntimeException("Ricompensa non trovata"));

            user.getRewards().remove(reward);
            userRepository.save(user);

            return ResponseEntity.ok(new Response<>(true));
        } catch (Exception e) {
            List<String> errors = new ArrayList<>();
            errors.add("Errore durante lo scollegamento dell'utente dalla ricompensa: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, errors));
        }
    }

}