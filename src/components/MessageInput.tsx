import React, { useState } from 'react'

type Props = {
  onSend: (text: string) => void
}

export default function MessageInput({ onSend }: Props) {
  const [text, setText] = useState('')

  function handleSend() {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <footer style={styles.wrapper}>
      <input
        style={styles.input}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Mesaj yaz..."
      />
      <button style={styles.button} onClick={handleSend}>Gönder</button>
    </footer>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { padding: 12, display: 'flex', gap: 8, borderTop: '1px solid #e6e6e6', background: '#fff' },
  input: { flex: 1, padding: '10px 12px', border: '1px solid #d9d9d9', borderRadius: 8, outline: 'none' },
  button: { padding: '10px 14px', border: 'none', borderRadius: 8, background: '#0d6efd', color: '#fff', cursor: 'pointer' }
}
