package fpl.sd.backend.utils;

import fpl.sd.backend.ai.chat.dto.Message;

import java.util.List;

public class MessageUtil {
    public static List<Message> createMessages(String messageContent, String jsonArray) {
        return List.of(
                new Message("system", messageContent),
                new Message("user", jsonArray)
        );
    }
}
