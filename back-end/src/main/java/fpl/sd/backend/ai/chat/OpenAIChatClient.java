package fpl.sd.backend.ai.chat;

import fpl.sd.backend.ai.chat.dto.ChatRequest;
import fpl.sd.backend.ai.chat.dto.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class OpenAIChatClient implements ChatClient {

    private final RestClient restClient;

    public OpenAIChatClient(@Value("${ai.openai.endpoint}") String endpoint,
                            @Value("${ai.openai.api-key}") String apiKey,
                            RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl(endpoint)
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    }

    @Override
    public ChatResponse generate(ChatRequest chatRequest) {
        return this.restClient
                .post()
                .contentType(MediaType.APPLICATION_JSON)
                .body(chatRequest)
                .retrieve()
                .body(ChatResponse.class);
    }
}
