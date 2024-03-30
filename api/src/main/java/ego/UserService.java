package ego;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {

    private final BCryptPasswordEncoder passwordEncoder;
    
    public UserService(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public String validateUserData(String email, String password, String name, String surname, Date birthDate, LocalDateTime registrationDate) {
        if (isValidEmail(email) && isValidPassword(password) && isValidName(name) && isValidSurname(surname) && isValidBirthDate(birthDate) && isValidRegistrationDate(registrationDate)) {
            return encodePassword(password);
        }
        return "";
    }

    public boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public boolean isValidPassword(String password) {
        return password != null && password.length() >= 8 && password.matches(".*[A-Z]+.*") && password.matches(".*[0-9]+.*");
    }

    public boolean isValidName(String name) {
        return name != null && !name.isEmpty();
    }

    public boolean isValidSurname(String surname) {
        return surname != null && !surname.isEmpty();
    }

    public boolean isValidBirthDate(Date birthDate) {
        return birthDate != null && birthDate.before(new Date());
    }

    public boolean isValidRegistrationDate(LocalDateTime registrationDate) {
        return registrationDate != null && registrationDate.isBefore(LocalDateTime.now());
    }

    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    public boolean verifyPassword(String hashedPassword, String password) {
        return passwordEncoder.matches(hashedPassword, password);
    }
}
