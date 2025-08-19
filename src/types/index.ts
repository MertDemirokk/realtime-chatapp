export type Chat = { id: number; name: string };
export type Message = { id: number; chatId: number; from: 'Me' | 'Other'; text: string; time: string };

export type User = {
    id: number
    name: string
    email: string
  }