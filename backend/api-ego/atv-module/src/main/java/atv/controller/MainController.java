package atv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import atv.model.BusNumber;
import atv.model.BusPath;
import atv.model.BusStop;
import atv.repository.BusNumberRepository;
import atv.repository.BusPathRepository;
import atv.repository.BusStopRepository;

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
        if (bus != null && bus.getBusStops() != null) {
            return bus.getBusStops();
        } else {
            return Collections.emptyList();
        }
    }

    @GetMapping("/getBusPathsByBusNumber")
    public List<BusPath> getBusPathsByBusNumber(@RequestParam Integer busNumber) {
        BusNumber bus = busNumberRepository.findByNumber(busNumber);
        if (bus != null && bus.getBusPaths() != null) {
            return bus.getBusPaths();
        } else {
            return Collections.emptyList();
        }
    }

    @GetMapping("/getBusNumbersByBusStop")
    public List<BusNumber> getBusNumbersByBusStop(@RequestParam Integer qrcodeNumber) {
        BusStop stop = busStopRepository.findByQrCodeNumber(qrcodeNumber);
        if (stop != null && stop.getBusNumbers() != null) {
            return stop.getBusNumbers();
        } else {
            return Collections.emptyList();
        }
    }
}