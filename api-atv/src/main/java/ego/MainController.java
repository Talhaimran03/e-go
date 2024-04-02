package ego;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @GetMapping("/busNumbers")
    public List<BusNumber> getAllBusNumbers() {
        Iterable<BusNumber> iterable = busNumberRepository.findAll();
        List<BusNumber> busNumbers = new ArrayList<>();
        iterable.forEach(busNumbers::add);
        return busNumbers;
    }

    @GetMapping("/busStops")
    public List<BusStop> getAllBusStops() {
        Iterable<BusStop> iterable = busStopRepository.findAll();
        List<BusStop> busStops = new ArrayList<>();
        iterable.forEach(busStops::add);
        return busStops;
    }

    @GetMapping("/busPaths")
    public List<BusPath> getAllBusPaths() {
        Iterable<BusPath> iterable = busPathRepository.findAll();
        List<BusPath> busPaths = new ArrayList<>();
        iterable.forEach(busPaths::add);
        return busPaths;
    }
}