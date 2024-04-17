package ego.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

	@Column(name="email", length=256, unique=true, nullable=false)
    private String email;

    @JsonIgnore
	@Column(name="password", length=256, nullable=false)
    private String password;

    @JsonIgnore
    @Transient
    private String passwordConfirm;
    
    @JsonIgnore
    @Column(name="token", length=256)
    private String token;

	@Column(name="name", length=256, nullable=false)
    private String name;

	@Column(name="surname", length=256, nullable=false)
    private String surname;

	@Temporal(TemporalType.DATE)
	@Column(name="birthDate", nullable=false)
    private Date birthDate;

    @Column(name = "profile_image", columnDefinition = "BLOB")
    private byte[] profileImage;

	@Column(name="registrationDate", nullable=false)
    private LocalDateTime registrationDate;
	
    @JsonIgnore
	@Column(name = "otp")
	private Integer otp;

	@Column(name = "active", nullable = false)
	private Boolean active = false;
	
    @Column(name = "actualPoints", nullable = false)
	private Integer actualPoints = 0;

    @Column(name = "totalPoints", nullable = false)
	private Integer totalPoints = 0;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Route> routes = new ArrayList<>();
    
    // Constructor

	public User(String email, String password, String name, String surname, Date birthDate, byte[] profileImage, LocalDateTime registrationDate, Integer otp) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.birthDate = birthDate;
        this.profileImage = profileImage;
        this.registrationDate = registrationDate;
        this.otp = otp;
    }

    public User() {
        // Default constructor
    }

    // Getters and setters
	
    public Integer getId() {
        return id;
    }

    // private void setId(Integer id) {
    //     this.id = id;
    // }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public byte[] getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(byte[] profileImage) {
        this.profileImage = profileImage;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Integer getOtp() {
        return otp;
    }

    public void setOtp(Integer otp) {
        this.otp = otp;
    }

	public boolean getActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Integer getActualPoints() {
        return actualPoints;
    }

    public void setActualPoints(Integer actualPoints) {
        this.actualPoints = actualPoints;
    }

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
    }

    public void addRoute(Route route) {
        routes.add(route);
        route.setUser(this);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", birthDate=" + birthDate +
                ", profileImage=" + profileImage +
                ", registrationDate=" + registrationDate +
                ", active=" + active +
                ", actualPoints=" + actualPoints +
                ", totalPoints=" + totalPoints +
                ", routes=" + routes +
                ", token='" + token + '\'' +
                '}';
    }

}
