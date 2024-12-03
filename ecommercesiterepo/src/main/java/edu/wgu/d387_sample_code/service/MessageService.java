package edu.wgu.d387_sample_code.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ExecutionException;

@Service
public class MessageService {

    private final ExecutorService executorService = Executors.newFixedThreadPool(2); // Thread pool

    public List<String> processWelcomeMessages() throws InterruptedException, ExecutionException {
        List<String> filenames = List.of("welcome_en.properties", "welcome_fr.properties"); // list of file names to make it future proof if we need to add more
        List<Future<String>> futures = new ArrayList<>();

        for (String filename : filenames) {
            futures.add(executorService.submit(() -> {
                // Log file processing and thread name to show that it's multithreading
                System.out.println("Processing file: " + filename + " on thread: " + Thread.currentThread().getName());
                return getWelcomeMessages(filename); // Process file
            }));
        }

        List<String> messages = new ArrayList<>();
        for (Future<String> future : futures) {
            messages.add(future.get()); // Collect results
        }

        return messages; // Return the processed messages
    }

    public String getWelcomeMessages(String filename) {
        try (InputStream stream = new ClassPathResource(filename).getInputStream()) {
            Properties properties = new Properties();
            properties.load(stream);
            return properties.getProperty("welcome");
        } catch (Exception e) {
            e.printStackTrace();
            return "Error loading message from " + filename;
        }
    }
}
