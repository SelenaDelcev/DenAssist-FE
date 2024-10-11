// services/chatService.ts
import axios from "axios";

export interface ChatMessage {
  role: string;
  content: string;
  files: File[];
  device?: string;
}

export const sendMessage = async (
  message: ChatMessage,
  sessionId: string,
  language: string,
  device: string,
  audioResponse: boolean
) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_CHAT_BE_URL}/chat`,
    {
      message,
      language,
      device,
      play_audio_response: audioResponse,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Session-ID": sessionId,
      },
      withCredentials: true,
    }
  );

  return response.data;
};

export const transcribeAudio = async (formData: FormData, sessionId: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_CHAT_BE_URL}/transcribe`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Session-ID': sessionId,
      },
    });
    return response.data.transcript;
  } catch (error) {
    console.error("Error during audio transcription:", error);
    throw error;
  }
};

export const handleFileSubmit = async (newMessage: ChatMessage, sessionId: string) => {
  const formData = new FormData();

  newMessage.files.forEach(file => formData.append('files', file));

  formData.append('message', newMessage.content);

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_CHAT_BE_URL}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Session-ID": sessionId,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during file upload:", error);
    throw error; 
  }
};

