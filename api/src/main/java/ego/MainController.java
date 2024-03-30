package ego;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Date;

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
                                       	    @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime registrationDate) {
		
		// Validate user data
		password = userService.validateUserData(email, password, name, surname, birthDate, registrationDate);
		if (password == "") {
			return false;
		}
		
		User user = new User(email, password, name, surname, birthDate, registrationDate);
		userRepository.save(user);
		return true;
	}

    // Read
    @GetMapping(path="/users/getAllUsers")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Update
	@PutMapping(path="/users/updateUser/{id}")
	public @ResponseBody boolean updateUser(@PathVariable Integer id,
											@RequestParam(required = false) String email,
											@RequestParam(required = false) String password,
											@RequestParam(required = false) String name,
											@RequestParam(required = false) String surname,
											@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date birthDate,
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
		if (registrationDate != null && userService.isValidRegistrationDate(registrationDate)) {
			user.setRegistrationDate(registrationDate);
		}
		user.setActive(active);
		user.setPoints(points);
		
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

}
