import type { Message } from "../types/message";

export const dummyMessages : Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! 👋 How can I help you today?",
  },
  {
    id: "2",
    role: "user",
    content: "Explain React Hooks.",
  },
  {
    id: "3",
     role: "assistant",
     content:
       "React Hooks let you use state and other React features inside functional components.",
   },
 ];