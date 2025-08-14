import React from 'react'
import type { Chat, Message } from '../types'
import MessageInput from './MessageInput'

type Props = {
  selectedChat: Chat
  messages: Message[]
  onSend: (text: string) => void
}

export default function ChatWindow({ selectedChat, messages, onSend }: Props) {
  return (
    <main style={styles.chat}>
      <header style={styles.header}>{selectedChat.name}</header>

      <div style={styles.messages}>
        {messages.map(m => (
          <div key={m.id} style={{ display: 'flex', justifyContent: m.from === 'Me' ? 'flex-end' : 'flex-start' }}>
            <div style={{ ...styles.bubble, background: m.from === 'Me' ? '#e7f1ff' : '#fff' }}>
              <div style={styles.text}>{m.text}</div>
              <div style={styles.meta}>{m.from} · {m.time}</div>
            </div>
          </div>
        ))}
        {messages.length === 0 && <div style={styles.empty}>Henüz mesaj yok.</div>}
      </div>

      <MessageInput onSend={onSend} />
    </main>
  )
}

const styles: Record<string, React.CSSProperties> = {
  chat: { flex: 1, display: 'flex', flexDirection: 'column', background: '#f5f7fb' },
  header: { padding: '14px 16px', borderBottom: '1px solid #e6e6e6', background: '#fff', fontWeight: 600 },
  messages: { flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 },
  bubble: { maxWidth: '70%', padding: '10px 12px', borderRadius: 12, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
  text: { marginBottom: 6 },
  meta: { fontSize: 12, color: '#7a7a7a' },
  empty: { color: '#888', textAlign: 'center', marginTop: 24 }
}
