package ego;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "bus_paths")
public class BusPath {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @Column(name = "busNumber", nullable = false)
    private BusNumber busNumber;

    @Column(name = "latitude", nullable = false)
    private BigDecimal latitude;

    @Column(name = "longitude", nullable = false)
    private BigDecimal longitude;

    // Constructor
    public BusPath(BusNumber busNumber, BigDecimal latitude, BigDecimal longitude) {
        this.busNumber = busNumber;
        this.latitude = latitude;
        this.longitude = longitude;
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
