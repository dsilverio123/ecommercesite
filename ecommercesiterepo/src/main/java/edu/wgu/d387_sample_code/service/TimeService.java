package edu.wgu.d387_sample_code.service;


import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class TimeService {

    public String convertTime(String baseTimeZone, String targetTimeZone) {


        // base time zone introduction

        ZonedDateTime baseTime = ZonedDateTime.now(ZoneId.of(baseTimeZone));

        // target time converts the base time to UTC
        ZonedDateTime targetTime = baseTime.withZoneSameInstant(ZoneId.of(targetTimeZone));
        // formats how the time will be displayed
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm a z");
        // formats into desired string we can use
        return targetTime.format(formatter);

    }
}
