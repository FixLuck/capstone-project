import React from "react";

export default function MessageParser({ content }) {
  const safeContent = typeof content === "string" ? content : "";
  const urlRegex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp))/i;
  const linkRegex = /(https?:\/\/[^\s]+)/gi; // URL thông thường

  const parseMessage = (text) => {
    return text.split(linkRegex).map((part, index) => {
      // Kiểm tra nếu đoạn text là URL ảnh
      if (urlRegex.test(part)) {
        const imageUrl = part.replace(/\)$/, ""); // Remove the closing bracket
        return (
          <div key={index}>
            <img
              src={imageUrl}
              alt="Attachment"
              className="max-w-full rounded-md"
            />
          </div>
        );
      }

      // Nếu đoạn text là URL thường
      if (linkRegex.test(part)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }

      // Nếu là đoạn text thông thường
      return part;
    });
  };
  return <div className="chat-message">{parseMessage(safeContent)}</div>;
}
