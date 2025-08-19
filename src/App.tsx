import React, { useEffect, useMemo, useState } from 'react'
import './App.css'
import ChatList from './components/ChatList'
import ChatWindow from './components/ChatWindow'
import type { Chat, Message, User } from './types'
import LoginPage from './pages/LoginPage'

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
  const [currentUser, setCurrentUser] = useState<User | null>(null)


  const [selectedChatId, setSelectedChatId] = useState<number>(1)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const chats = initialChats



  useEffect(() => {
    const saved = localStorage.getItem('rc_user')
    if (saved) {
      try {
        const u = JSON.parse(saved) as User
        if (u && u.email) setCurrentUser(u)
      } catch {
        localStorage.removeItem('rc_user')
      }
    }
  }, [])

  const selectedChat = useMemo(
    () => chats.find(c => c.id === selectedChatId),
    [chats, selectedChatId]
  )

  const visibleMessages = useMemo(
    () => messages.filter(m => m.chatId === selectedChatId),
    [messages, selectedChatId]
  )

  function handleSend(text: string) {
    const nextId = (messages.at(-1)?.id ?? 0) + 1
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [...prev, { id: nextId, chatId: selectedChatId, from: 'Me', text, time }])
  }

  function handleLogout() {
    localStorage.removeItem('rc_user')
    setCurrentUser(null)
  }


  if (!currentUser) {
    return <LoginPage onLogin={setCurrentUser} />
  }

  if (!selectedChat) {
    return (
      <div style={{ padding: 20 }}>
        Seçili sohbet bulunamadı.{' '}
        <button onClick={() => setSelectedChatId(chats[0].id)}>İlk sohbete dön</button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelect={setSelectedChatId}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '10px 12px', background: '#fff', borderBottom: '1px solid #e6e6e6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>Hoş geldin, {currentUser.name}</strong>
          <button onClick={handleLogout} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #d9d9d9', background: '#fff', cursor: 'pointer' }}>
            Çıkış Yap
          </button>
        </div>

        <ChatWindow
          selectedChat={selectedChat}
          messages={visibleMessages}
          onSend={handleSend}
        />
      </div>
    </div>
  )
}
