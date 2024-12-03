package edu.wgu.d387_sample_code.rest;

import org.springframework.web.bind.annotation.*;
import edu.wgu.d387_sample_code.service.TimeService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/timezone")
@CrossOrigin(origins = "http://localhost:4200") // Allowing requests from port 4200
public class TimeController {

    private final TimeService timeService;

    // Constructor for TimeService
    public TimeController(TimeService timeService) {
        this.timeService = timeService;
    }

    // Endpoint to get the time conversions from a given base time zone to several target time zones listed (can be added if needed)
    // The 'baseTimeZone' parameter is expected to be a string representing the time zone from which the conversion will be made. This is noted in the app.component.ts

    @GetMapping("/convert")
    public Map<String, String> getConvertedTimes(@RequestParam String baseTimeZone) {
        // Initialize an empty map to store the converted times for each target time zone
        Map<String, String> result = new HashMap<>();
        result.put("ET", timeService.convertTime(baseTimeZone, "America/New_York"));
        result.put("MT", timeService.convertTime(baseTimeZone, "America/Denver"));
        result.put("UTC", timeService.convertTime(baseTimeZone, "UTC"));
        return result;
    }
}
