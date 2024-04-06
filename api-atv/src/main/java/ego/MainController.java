package ego;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/atv")
public class MainController {

    @Autowired
    private BusNumberRepository busNumberRepository;

    @Autowired
    private BusStopRepository busStopRepository;

    @Autowired
    private BusPathRepository busPathRepository;

    @GetMapping("/getAllBusNumbers")
    public List<BusNumber> getAllBusNumbers() {
        Iterable<BusNumber> iterable = busNumberRepository.findAll();
        List<BusNumber> busNumbers = new ArrayList<>();
        iterable.forEach(busNumbers::add);
        return busNumbers;
    }

    @GetMapping("/getAllBusStops")
    public List<BusStop> getAllBusStops() {
        Iterable<BusStop> iterable = busStopRepository.findAll();
        List<BusStop> busStops = new ArrayList<>();
        iterable.forEach(busStops::add);
        return busStops;
    }

    @GetMapping("/getAllBusPaths")
    public List<BusPath> getAllBusPaths() {
        Iterable<BusPath> iterable = busPathRepository.findAll();
        List<BusPath> busPaths = new ArrayList<>();
        iterable.forEach(busPaths::add);
        return busPaths;
    }

    @GetMapping("/getBusStopsByBusNumber")
    public List<BusStop> getBusStopsByBusNumber(@RequestParam Integer busNumber) {
        BusNumber bus = busNumberRepository.findByNumber(busNumber);
        return bus.getBusStops();
    }

    @GetMapping("/getBusPathsByBusNumber")
    public List<BusPath> getBusPathsByBusNumber(@RequestParam Integer busNumber) {
        BusNumber bus = busNumberRepository.findByNumber(busNumber);
        return bus.getBusPaths();
    }

    @GetMapping("/grtBusNumbersByBusStop")
    public List<BusNumber> getBusNumbersByBusStop(@RequestParam Integer stopId) {
        BusStop stop = busStopRepository.findById(stopId).orElse(null);
        return stop != null ? stop.getBusNumbers() : Collections.emptyList();
    }

    /* To do → Ottenere tutte le fermate attraversate da un certo percorso fatto da un utente avendo la posizione di partenza e fine */

}