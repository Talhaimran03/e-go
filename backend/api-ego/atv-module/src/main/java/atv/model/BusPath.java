package atv.model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "bus_paths")
public class BusPath {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "bus_number_id")
    @JsonIgnoreProperties("busPaths")
    private BusNumber busNumber;

    @Column(name = "latitude", nullable = false, precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(name = "longitude", nullable = false, precision = 10, scale = 8)
    private BigDecimal longitude;

    // Constructor
    public BusPath(BusNumber busNumber, BigDecimal latitude, BigDecimal longitude) {
        this.busNumber = busNumber;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public BusPath() {
        // Default
    }

    // Getter

    public Integer getId() {
        return id;
    }

    public BusNumber getBusNumber() {
        return busNumber;
    }
    
    public BigDecimal getLatitude() {
        return latitude;
    }
    
    public BigDecimal getLongitude() {
        return longitude;
    }
}
