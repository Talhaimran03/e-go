package ego.model;

import java.time.LocalDateTime;

import org.springframework.data.geo.Point;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "routes")
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "start_coordinates")
    private Point startCoordinates;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Europe/Rome")
    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_coordinates")
    private Point endCoordinates;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Europe/Rome")
    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "active", nullable = false)
    private Boolean active = true;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    // Constructor

    public Route(Point startCoordinates, LocalDateTime startTime, User user) {
        this.startCoordinates = startCoordinates;
        this.startTime = startTime;
        this.user = user;
    }

    public Route() {
        // Default constructor
    }

    // Getters and setters
	
    public Integer getId() {
        return id;
    }

    // private void setId(Integer id) {
    //     this.id = id;
    // }

    public Point getStartCoordinates() {
        return startCoordinates;
    }

    public void setStartCoordinates(Point startCoordinates) {
        this.startCoordinates = startCoordinates;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime){
        this.startTime = startTime;
    }

    public Point getEndCoordinates() {
        return endCoordinates;
    }

    public void setEndCoordinates(Point endCoordinates) {
        this.endCoordinates = endCoordinates;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime){
        this.endTime = endTime;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Route{" +
                "id=" + id +
                ", startCoordinates=" + startCoordinates +
                ", startTime=" + startTime +
                ", endCoordinates=" + endCoordinates +
                ", endTime=" + endTime +
                ", user=" + user +
                '}';
    }
}
