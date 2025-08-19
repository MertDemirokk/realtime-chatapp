import React, { useState } from 'react'
import type { User } from '../types'

type Props = {
  onLogin: (user: User) => void
}

export default function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function validateEmail(value: string) {
    // basit bir kontrol: "@" ve "." içeriyor mu
    return /\S+@\S+\.\S+/.test(value)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!validateEmail(email)) {
      setError('Lütfen geçerli bir e‑posta gir.')
      return
    }
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalı.')
      return
    }

    try {
      setLoading(true)
      // Şimdilik backend yok: sahte bir gecikme verelim
      await new Promise(res => setTimeout(res, 500))

      // Demo kullanıcı oluştur (normalde backend döner)
      const demoUser: User = {
        id: 1,
        name: email.split('@')[0],
        email
      }

      // localStorage’a yaz
      localStorage.setItem('rc_user', JSON.stringify(demoUser))

      // App’e haber ver
      onLogin(demoUser)
    } catch (err) {
      setError('Giriş sırasında bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>Giriş Yap</h1>

        <label style={styles.label}>E‑posta</label>
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="ornek@mail.com"
        />

        <label style={styles.label}>Şifre</label>
        <div style={styles.passwordRow}>
          <input
            style={{ ...styles.input, margin: 0, flex: 1 }}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(s => !s)}
            style={styles.toggleBtn}
          >
            {showPassword ? 'Gizle' : 'Göster'}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button type="submit" style={styles.loginBtn} disabled={loading}>
          {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
        </button>

        <p style={styles.hint}>
          Demo: Herhangi bir geçerli e‑posta ve 6+ haneli şifre ile giriş yapabilirsin.
        </p>
      </form>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb', padding: 16 },
  card: { width: 360, background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' },
  title: { margin: '0 0 16px', fontSize: 20 },
  label: { fontSize: 13, color: '#555', marginTop: 10, marginBottom: 6, display: 'block' },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #d9d9d9', borderRadius: 8, outline: 'none', marginBottom: 10 },
  passwordRow: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 },
  toggleBtn: { padding: '10px 12px', borderRadius: 8, border: '1px solid #d9d9d9', background: '#fff', cursor: 'pointer' },
  error: { background: '#ffe6e6', color: '#b10000', padding: '8px 10px', borderRadius: 8, marginTop: 6, marginBottom: 6, fontSize: 13 },
  loginBtn: { width: '100%', padding: '10px 14px', border: 'none', borderRadius: 8, background: '#0d6efd', color: '#fff', cursor: 'pointer', marginTop: 6 },
  hint: { fontSize: 12, color: '#777', marginTop: 10, textAlign: 'center' }
}
