package ego;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "bus_numbers")
public class BusNumber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "number", unique = true, nullable = false)
    private String number;
    
    @Column(name = "qr_code_number")
    private Integer qrCodeNumber;

    @ManyToMany
    @JoinTable(
        name = "stops_bus_numbers",
        joinColumns = @JoinColumn(name = "bus_number_id"),
        inverseJoinColumns = @JoinColumn(name = "stop_id")
    )
    private List<BusStop> busStops;
    
    // Constructor
    public BusNumber(String number, Integer qrCodeNumber, List<BusStop> busStops) {
        this.number = number;
        this.qrCodeNumber = qrCodeNumber;
        this.busStops = busStops;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getNumber() {
        return number;
    }
    
    public Integer qrCodeNumber() {
        return qrCodeNumber;
    }

    public List<BusStop> getBusStops() {
        return busStops;
    }
}
