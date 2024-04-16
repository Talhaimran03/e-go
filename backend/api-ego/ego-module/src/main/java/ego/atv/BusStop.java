package ego.atv;

import java.math.BigDecimal;

public class BusStop {
    public String name;
    public BigDecimal latitude;
    public BigDecimal longitude;
    public Integer qrCodeNumber;

    // Costruttore
    public BusStop(String name, BigDecimal latitude, BigDecimal longitude, Integer qrCodeNumber) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.qrCodeNumber = qrCodeNumber;
    }
}
