package fpl.sd.backend.ai.chat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fpl.sd.backend.ai.chat.dto.ChatRequest;
import fpl.sd.backend.ai.chat.dto.ChatResponse;
import fpl.sd.backend.ai.chat.dto.Choice;
import fpl.sd.backend.ai.chat.dto.Message;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.startsWith;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.*;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@RestClientTest(OpenAIChatClient.class)
class OpenAIChatClientTest {

    @Autowired
    private OpenAIChatClient openAIChatClient;

    @Autowired
    private MockRestServiceServer mockServer;

    private String url;

    @Autowired
    private ObjectMapper mapper;

    @BeforeEach
    void setUp() {
        this.url = "https://api.openai.com/v1/chat/completions";
    }

    @Test
    void testGenerateSuccess() throws JsonProcessingException {
        //Given
        ChatRequest chatRequest = new ChatRequest("gpt-4o-mini", List.of(
                new Message("system", "Your task is to generate a short summary of a given JSON in at most 100 words. The summary include number of brand, each brands description"),
                new Message("user", "A json Array")
        ));

        ChatResponse chatResponse = new ChatResponse(List.of(
                new Choice(0, new Message("assistant", "There are four active brands in the JSON data"))
        ));

        this.mockServer.expect(requestTo(this.url))
                .andExpect(method(HttpMethod.POST))
                .andExpect(header("Authorization", startsWith("Bearer ")))
                .andExpect(content().json(this.mapper.writeValueAsString(chatRequest)))
                .andRespond(withSuccess(this.mapper.writeValueAsString(chatResponse), MediaType.APPLICATION_JSON));
        //When

        ChatResponse generatedChatResponse = this.openAIChatClient.generate(chatRequest);

        //Then
        this.mockServer.verify(); // Verify that all expected requests set up were indeed performance
        assertThat(generatedChatResponse.getChoices().get(0).getMessage().getContent()).isEqualTo("There are four active brands in the JSON data");
    }
}