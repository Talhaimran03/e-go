package ego;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.nio.file.Path;

@Controller
@RequestMapping(path="/ego")
public class MainController {
	
	// Users operations

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // Create
    @PostMapping(path="/users/addUser")
    public @ResponseBody boolean addNewUser(@RequestParam String email,
                                            @RequestParam String password,
                                            @RequestParam String name,
                                            @RequestParam String surname,
                                            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date birthDate,
											@RequestParam(required = false) MultipartFile profileImage) throws URISyntaxException {
		
		// Validate user data
		Boolean valid = userService.validateUserData(email, password, name, surname, birthDate);
		if (!valid) {
			return false;
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
		
		User user = new User(email, password, name, surname, birthDate, profileImageData, registrationDate);
		userRepository.save(user);
		return true;
	}

    // Read
    @GetMapping(path="/users/getAllUsers")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

	@GetMapping(path="/users/getUser")
	public @ResponseBody User getUserById(@RequestParam Integer id) {
		Optional<User> userOptional = userRepository.findById(id);
		return userOptional.orElse(null);
	}

    // Update
	@PutMapping(path="/users/updateUser/{id}")
	public @ResponseBody boolean updateUser(@PathVariable Integer id,
											@RequestParam(required = false) String email,
											@RequestParam(required = false) String password,
											@RequestParam(required = false) String name,
											@RequestParam(required = false) String surname,
											@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date birthDate,
											@RequestParam(required = false) MultipartFile profileImage,
											@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime registrationDate,
											@RequestParam(required = false) Boolean active,
											@RequestParam(required = false) Integer points) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

		// Update only required parameters
		if (email != null && userService.isValidEmail(email)) {
			user.setEmail(email);
		}
		if (password != null && userService.isValidPassword(password)) {
			user.setPassword(userService.encodePassword(password));
		}
		if (name != null && userService.isValidName(name)) {
			user.setName(name);
		}
		if (surname != null && userService.isValidSurname(surname)) {
			user.setSurname(surname);
		}
		if (birthDate != null && userService.isValidBirthDate(birthDate)) {
			user.setBirthDate(birthDate);
		}
		if (profileImage != null) {
			byte[] profileImageData = null;
			try {
				profileImageData = profileImage.getBytes();
				user.setProfileImage(profileImageData);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if (registrationDate != null && userService.isValidRegistrationDate(registrationDate)) {
			user.setRegistrationDate(registrationDate);
		}
		if (active != null) {
			user.setActive(active);
		}
		if (points != null) {
            user.setPoints(points);
        }
		
		userRepository.save(user);
		return true;
	}

    // Delete
    @DeleteMapping(path="/users/deleteUser/{id}")
    public @ResponseBody boolean  deleteUser(@PathVariable Integer id) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
		userRepository.delete(user);
		return true;
	}

	// Login
	@PostMapping(path="/users/login")
	public @ResponseBody boolean loginUser(@RequestParam String email, @RequestParam String password) {
		User user = userRepository.findByEmail(email);
		
		if (user != null && userService.verifyPassword(password, user.getPassword())) {
			return true;
		} else {
			return false;
		}
	}


	// Routes operations

	// Create
	@PostMapping("/routes/addRoute")
	public boolean addRoute(@RequestParam Point startCoordinates,
							@RequestParam LocalDateTime startTime,
							@RequestParam Point endCoordinates,
							@RequestParam LocalDateTime endTime,
							@RequestParam Integer userId) {
		User user = userRepository.findById(userId).orElse(null);
		if (user != null) {
			Route route = new Route(startCoordinates, startTime, endCoordinates, endTime, user);
			routeRepository.save(route);
			return true;
		} else {
			return false;
		}
	}

	// Read
	@GetMapping("/routes/getAllRoutes")
	public List<Route> getAllRoutes() {
		return routeRepository.findAll();
	}

	// UPDATE
	@PutMapping("/routes/updateRoute/{id}")
	public boolean updateRoute(@PathVariable Integer id,
							@RequestParam(required = false) Point startCoordinates,
							@RequestParam(required = false) LocalDateTime startTime,
							@RequestParam(required = false) Point endCoordinates,
							@RequestParam(required = false) LocalDateTime endTime,
							@RequestParam(required = false) Integer userId) {
		Route route = routeRepository.findById(id).orElse(null);
		if (route != null) {
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
					return false;
				}
			}
			routeRepository.save(route);
			return true;
		} else {
			return false;
		}
	}

	// Delete
	@DeleteMapping("/routes/deleteRoute/{id}")
	public boolean deleteRoute(@PathVariable Integer id) {
		Route route = routeRepository.findById(id).orElse(null);
		if (route != null) {
			routeRepository.delete(route);
			return true;
		} else {
			return false;
		}
	}

}
