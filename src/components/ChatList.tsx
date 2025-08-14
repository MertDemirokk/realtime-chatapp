import React from 'react'
import type { Chat } from '../types'

type Props = {
  chats: Chat[]
  selectedChatId: number
  onSelect: (id: number) => void
}

export default function ChatList({ chats, selectedChatId, onSelect }: Props) {
  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.title}>Sohbetler</h2>
      <ul style={styles.list}>
        {chats.map(c => (
          <li
            key={c.id}
            onClick={() => onSelect(c.id)}
            style={{
              ...styles.item,
              background: selectedChatId === c.id ? 'rgba(255,255,255,0.25)' : 'transparent'
            }}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </aside>
  )
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: { width: 260, background: '#0d6efd', color: '#fff', padding: 16 },
  title: { margin: '0 0 12px', fontSize: 18 },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  item: { padding: '10px 12px', borderRadius: 8, cursor: 'pointer', opacity: 0.95 }
}
