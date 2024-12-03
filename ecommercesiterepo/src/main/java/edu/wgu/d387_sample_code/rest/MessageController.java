package edu.wgu.d387_sample_code.rest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.concurrent.ExecutionException;
import edu.wgu.d387_sample_code.service.MessageService;


@RestController
@CrossOrigin(origins = "http://localhost:4200") // Allowing requests from port 4200
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/welcomemessage")
    public List<String> getWelcomeMessages() throws InterruptedException, ExecutionException {
        return messageService.processWelcomeMessages(); // Calls the method to log on backend
    }
}
