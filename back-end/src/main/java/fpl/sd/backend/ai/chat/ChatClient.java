package fpl.sd.backend.ai.chat;

import fpl.sd.backend.ai.chat.dto.ChatRequest;
import fpl.sd.backend.ai.chat.dto.ChatResponse;

public interface ChatClient {

    ChatResponse generate(ChatRequest chatRequest);
}
