package ego;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.mail.internet.MimeMessage;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;

@Service
public class UserService {

    @Autowired
    private HttpSession httpSession;

    private static final String SESSION_KEY = "";

    public void startSession() {
        startSession();
        String sessionKey = (String) httpSession.getAttribute(SESSION_KEY);
        if (sessionKey == null) {
            sessionKey = generateSHA256Hash(UUID.randomUUID().toString());
            httpSession.setAttribute(SESSION_KEY, sessionKey);
        }
    }

    public void writeSession(User user) {
        String value = UUID.randomUUID().toString();
        String key = "token";
    
        httpSession.setAttribute(key, value);
        
        user.setToken(value);
        userRepository.save(user);
    }

    public String readSession() {
        startSession();
        String sessionKey = (String) httpSession.getAttribute(SESSION_KEY);
        return (String) httpSession.getAttribute(sessionKey);
    }

    public void deleteSession() {
        httpSession.invalidate();
    }

    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    
    public UserService(BCryptPasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public List<String> validateUserData(String email, String password, String passwordConfirm, String name, String surname, Date birthDate) {
        List<String> errors = new ArrayList<>();

        if (!isValidEmail(email)) {
            errors.add("Formato email non valido");
        }
        if (userRepository.existsByEmail(email)) {
            User existingUser = userRepository.findByEmail(email);
            if (existingUser.getActive()) {
                errors.add("Email già registrata, accedi");
            } else {
                errors.add("Email già registrata, conferma otp");
            }
        }
        if (!isValidPassword(password)) {
            errors.add("Password non valida");
        }
        if (!password.equals(passwordConfirm)) {
            errors.add("Le password non coincidono");
        }
        if (!isValidName(name)) {
            errors.add("Nome non valido");
        }
        if (!isValidSurname(surname)) {
            errors.add("Cognome non valido");
        }
        if (!isValidBirthDate(birthDate)) {
            errors.add("Data di nascita non valida");
        }

        return errors;
    }

    public boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public boolean isEmailAlreadyRegistered(String email) {
        return userRepository.existsByEmail(email);
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

    public Integer generateOtp() {
        Random rand = new Random();
		Integer otp = 1000 + rand.nextInt(9000);
        return otp;
    }
    
    public void sendVerificationEmail(String to, int otp) {

        String from = "ego.project.work@gmail.com";
        final String username = "ego.project.work";
        final String password = "dtik tryu totx fstw";

        String host = "smtp.gmail.com";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "587");

        // Get the Session object.
        javax.mail.Session session = javax.mail.Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            Message message = new MimeMessage(session);

            message.setFrom(new InternetAddress(from));

            message.setRecipients(Message.RecipientType.TO,
            InternetAddress.parse(to));

            message.setSubject("HTML Email");

            message.setSubject("Codice di verifica e-go");
            
            String body = "<div style='font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2'>" +
              "<div style='margin:50px auto;width:70%;padding:20px 0'>" +
              "<div style='border-bottom:1px solid #eee'>" +
              "<a href='' style='font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600'>e-go</a>" +
              "</div>" +
              "<p style='font-size:1.1em'>Ciao,</p>" +
              "<p>Grazie per aver scelto e-go. Ecco il tuo codice otp:</p>" +
              "<h2 style='background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;'>" + otp + "</h2>" +
              "<p style='font-size:0.9em;'>Cordiali saluti,<br />e-go</p>" +
              "<hr style='border:none;border-top:1px solid #eee' />" +
              "<div style='float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300'>" +
              "<p>e-go</p>" +
              "<p>Verona</p>" +
              "</div>" +
              "</div>" +
              "</div>";
            message.setContent(body, "text/html");

            Transport.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    private String generateSHA256Hash(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes());
            return java.util.Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

}
