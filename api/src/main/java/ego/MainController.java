package ego;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Date;

@Controller
@RequestMapping(path="/users")
public class MainController {
    @Autowired
    private UserRepository userRepository;
    private UserService userService;

    // Create
    @PostMapping(path="/add")
    public @ResponseBody boolean addNewUser(@RequestParam String email,
                                            @RequestParam String password,
                                            @RequestParam String name,
                                            @RequestParam String surname,
                                            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date birthDate,
                                       	    @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime registrationDate) {
		
		password = userService.validateUserData(email, password, name, surname, birthDate, registrationDate);
		if (password != "") {
			return false;
		}											
		User user = new User(email, password, name, surname, birthDate, registrationDate);
		userRepository.save(user);
		return true;
	}

    // Read
    @GetMapping(path="/getAll")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping(path="/update/{id}")
	public @ResponseBody boolean updateUser(@PathVariable Integer id,
											@RequestParam(required = false) String email,
											@RequestParam(required = false) String password,
											@RequestParam(required = false) String name,
											@RequestParam(required = false) String surname,
											@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date birthDate,
											@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime registrationDate,
											@RequestParam(required = false) boolean active) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

		// Update only required parameters
		if (email != null) {
			user.setEmail(email);
		}
		if (password != null) {
			user.setPassword(password);
		}
		if (name != null) {
			user.setName(name);
		}
		if (surname != null) {
			user.setSurname(surname);
		}
		if (birthDate != null) {
			user.setBirthDate(birthDate);
		}
		if (registrationDate != null) {
			user.setRegistrationDate(registrationDate);
		}
		user.setActive(active);

		userRepository.save(user);
		return true;
	}


    // Delete
    @DeleteMapping(path="/delete/{id}")
    public @ResponseBody boolean  deleteUser(@PathVariable Integer id) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
		userRepository.delete(user);
		return true;
	}
}
