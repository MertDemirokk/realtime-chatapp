import React, { useMemo, useState } from 'react'
import './App.css'
import ChatList from './components/ChatList'
import ChatWindow from './components/ChatWindow'
import type { Chat, Message } from './types'

const initialChats: Chat[] = [
  { id: 1, name: 'Genel' },
  { id: 2, name: 'Ahmet' },
  { id: 3, name: 'Mert' },
]

const initialMessages: Message[] = [
  { id: 1, chatId: 1, from: 'Me', text: 'Merhaba!', time: '10:00' },
  { id: 2, chatId: 1, from: 'Other', text: 'Selam!', time: '10:01' },
  { id: 3, chatId: 2, from: 'Other', text: 'Bugün görüşelim mi?', time: '09:20' },
]

export default function App() {
  const [selectedChatId, setSelectedChatId] = useState<number>(1)
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const chats = initialChats
  const selectedChat = useMemo(
    () => chats.find(c => c.id === selectedChatId)!,
    [chats, selectedChatId]
  )

  const visibleMessages = useMemo(
    () => messages.filter(m => m.chatId === selectedChatId),
    [messages, selectedChatId]
  )

  function handleSend(text: string) {
    const nextId = (messages.at(-1)?.id ?? 0) + 1
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const newMsg: Message = {
      id: nextId,
      chatId: selectedChatId,
      from: 'Me',
      text,
      time
    }
    setMessages(prev => [...prev, newMsg])
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelect={setSelectedChatId}
      />
      <ChatWindow
        selectedChat={selectedChat}
        messages={visibleMessages}
        onSend={handleSend}
      />
    </div>
  )
}
