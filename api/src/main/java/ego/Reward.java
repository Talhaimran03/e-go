package ego;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
@Table(name = "rewards")
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String company;

    @Column(name = "discountPercentage", nullable = false)
    private double discountPercentage;

    @Column(name = "requiredPoints", nullable = false)
    private Integer requiredPoints;

    @Column(name = "url", nullable = false)
    private String url;

    @ManyToMany(mappedBy = "rewards")
    private Set<User> users = new HashSet<>();

    // Constructor

    public Reward(String company, double discountPercentage, Integer requiredPoints, String url) {
        this.company = company;
        this.discountPercentage = discountPercentage;
        this.requiredPoints = requiredPoints;
        this.url = url;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public Integer getRequiredPoints() {
        return requiredPoints;
    }

    public void setRequiredPoints(Integer requiredPoints) {
        this.requiredPoints = requiredPoints;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    
    @Override
    public String toString() {
        return "Reward{" +
                "id=" + id +
                ", company='" + company + '\'' +
                ", discountPercentage=" + discountPercentage +
                ", requiredPoints=" + requiredPoints +
                ", url='" + url + '\'' +
                '}';
    }
}
