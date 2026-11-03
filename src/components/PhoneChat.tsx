// Copyright (c) Tunlabs Corp. All rights reserved.

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RotateCcw, SendHorizontal } from 'lucide-react'

const CONTACT_EMAIL = 'franciscotun95@gmail.com'
const EMAIL_RE = /\S+@\S+\.\S+/

type Msg = { from: 'bot' | 'user'; text: string; link?: string }
type Step = 'name' | 'email' | 'message' | 'sending' | 'done'

export function PhoneChat() {
  const { t } = useTranslation()
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [step, setStep] = useState<Step>('name')
  const [typing, setTyping] = useState(false)
  const data = useRef({ name: '', email: '' })
  const listRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  const botSay = (text: string) => {
    setTyping(true)
    window.setTimeout(() => {
      setMsgs((m) => [...m, { from: 'bot', text }])
      setTyping(false)
    }, 650)
  }

  useEffect(() => {
    if (started.current) return
    started.current = true
    botSay(t('showcase.chat.greeting'))
  }, [t])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs, typing])

  const deliver = async (message: string) => {
    setStep('sending')
    setTyping(true)
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: data.current.name,
            email: data.current.email,
            message,
            _subject: 'Nuevo contacto — Tunlabs web',
            _replyto: data.current.email,
            _template: 'table',
            _captcha: 'false',
          }),
        },
      )
      if (!res.ok) throw new Error(String(res.status))
      setTyping(false)
      setMsgs((m) => [...m, { from: 'bot', text: t('showcase.chat.success') }])
    } catch {
      setTyping(false)
      setMsgs((m) => [
        ...m,
        {
          from: 'bot',
          text: t('showcase.chat.error'),
          link: `mailto:${CONTACT_EMAIL}?subject=Contacto%20Tunlabs&body=${encodeURIComponent(message)}`,
        },
      ])
    }
    setStep('done')
  }

  const send = () => {
    const text = input.trim()
    if (!text || step === 'sending') return
    setMsgs((m) => [...m, { from: 'user', text }])
    setInput('')

    if (step === 'name') {
      data.current.name = text
      setStep('email')
      botSay(t('showcase.chat.askEmail', { name: text }))
    } else if (step === 'email') {
      if (!EMAIL_RE.test(text)) {
        botSay(t('showcase.chat.invalidEmail'))
        return
      }
      data.current.email = text
      setStep('message')
      botSay(t('showcase.chat.askProject'))
    } else {
      void deliver(text)
    }
  }

  const reset = () => {
    setMsgs([])
    setStep('name')
    data.current = { name: '', email: '' }
    botSay(t('showcase.chat.greeting'))
  }

  return (
    <div className="flex h-full flex-col bg-slate-950">
      <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto p-3">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-[10px] leading-snug whitespace-pre-wrap ${
                m.from === 'user'
                  ? 'rounded-br-sm bg-brand-600 text-white'
                  : 'rounded-bl-sm bg-white/8 text-slate-200'
              }`}
            >
              {m.text}
              {m.link && (
                <a
                  href={m.link}
                  className="mt-1 block font-medium text-brand-300 underline"
                >
                  {CONTACT_EMAIL}
                </a>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-xl rounded-bl-sm bg-white/8 px-2.5 py-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1 animate-bounce rounded-full bg-slate-500"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {step === 'done' ? (
        <div className="border-t border-white/10 p-2">
          <button
            type="button"
            onClick={reset}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-white/5 py-1.5 text-[10px] font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RotateCcw size={11} />
            {t('showcase.chat.again')}
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
          className="flex items-center gap-1.5 border-t border-white/10 p-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('showcase.chat.placeholder')}
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] text-white placeholder-slate-500 outline-none focus:border-brand-500/60"
          />
          <button
            type="submit"
            aria-label={t('showcase.chat.send')}
            disabled={!input.trim()}
            className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white transition-colors hover:bg-brand-500 disabled:opacity-40"
          >
            <SendHorizontal size={13} />
          </button>
        </form>
      )}
    </div>
  )
}
