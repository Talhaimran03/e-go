package ego;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "bus_numbers")
public class BusNumber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "number", unique = true, nullable = false)
    private Integer number;
    
    @Column(name = "qr_code_number")
    private Integer qrCodeNumber;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
        name = "stops_bus_numbers",
        joinColumns = @JoinColumn(name = "bus_number_id"),
        inverseJoinColumns = @JoinColumn(name = "stop_id")
    )
    private List<BusStop> busStops;

    @OneToMany(mappedBy = "busNumber")
    private List<BusPath> busPaths;
    
    // Constructor
    public BusNumber(Integer number, Integer qrCodeNumber, List<BusStop> busStops) {
        this.number = number;
        this.qrCodeNumber = qrCodeNumber;
        this.busStops = busStops;
    }

    public BusNumber() {
        // Default
    }

    // Getters
    public int getId() {
        return id;
    }

    public Integer getNumber() {
        return number;
    }
    
    public Integer qrCodeNumber() {
        return qrCodeNumber;
    }

    public List<BusStop> getBusStops() {
        return busStops;
    }

    public List<BusPath> getBusPaths() {
        return busPaths;
    }
}
