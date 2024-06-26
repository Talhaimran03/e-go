package atv.model;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "bus_stops")
public class BusStop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "latitude", nullable = false, precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(name = "longitude", nullable = false, precision = 10, scale = 8)
    private BigDecimal longitude;

    @Column(name = "qr_code_number", nullable = false)
    private Integer qrCodeNumber;

    @JsonIgnore
    @ManyToMany(mappedBy = "busStops")
    private List<BusNumber> busNumbers;

    // Constructor
    public BusStop(String name, BigDecimal latitude, BigDecimal longitude, Integer qrCodeNumber, List<BusNumber> bus) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.qrCodeNumber = qrCodeNumber;
        this.busNumbers = bus;
    }

    public BusStop() {
        // Default
    }

    // Getters
    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public Integer getQrCodeNumber() {
        return qrCodeNumber;
    }

    public List<BusNumber> getBusNumbers() {
        return busNumbers;
    }
}