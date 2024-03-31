package ego;

import java.time.LocalDateTime;

import org.springframework.data.geo.Point;

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

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_coordinates")
    private Point endCoordinates;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    public Route(Point startCoordinates, LocalDateTime startTime, Point endCoordinates, LocalDateTime endTime, User user) {
        this.startCoordinates = startCoordinates;
        this.startTime = startTime;
        this.endCoordinates = endCoordinates;
        this.endTime = endTime;
        this.user = user;
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

    public Point getEndoordinates() {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
