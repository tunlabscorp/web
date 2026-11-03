// Copyright (c) Tunlabs Corp. All rights reserved.

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Loader2, RotateCcw, SendHorizontal } from 'lucide-react'

const CONTACT_EMAIL = 'franciscotun95@gmail.com'
const EMAIL_RE = /\S+@\S+\.\S+/

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Fields = { name: string; email: string; message: string }

export function PhoneForm() {
  const { t } = useTranslation()
  const [fields, setFields] = useState<Fields>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const submit = async () => {
    const errs: Partial<Fields> = {}
    if (!fields.name.trim()) errs.name = t('showcase.form.required')
    if (!EMAIL_RE.test(fields.email.trim()))
      errs.email = t('showcase.form.invalidEmail')
    if (!fields.message.trim()) errs.message = t('showcase.form.required')
    setErrors(errs)
    if (Object.values(errs).some(Boolean)) return

    setStatus('sending')
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
            name: fields.name.trim(),
            email: fields.email.trim(),
            message: fields.message.trim(),
            _subject: 'Nuevo contacto — Tunlabs web',
            _replyto: fields.email.trim(),
            _template: 'table',
            _captcha: 'false',
          }),
        },
      )
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const inputCls = (invalid?: string) =>
    `w-full rounded-lg border bg-white px-2.5 py-1.5 text-[10px] text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-500/60 dark:bg-white/5 dark:text-white dark:placeholder-slate-500 ${
      invalid ? 'border-rose-500/60' : 'border-slate-200 dark:border-white/10'
    }`

  if (status === 'sent') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
        <CheckCircle2 size={30} className="text-emerald-500 dark:text-emerald-400" />
        <p className="text-[11px] font-medium text-slate-900 dark:text-white">
          {t('showcase.form.sentTitle')}
        </p>
        <p className="text-[10px] leading-snug text-slate-500 dark:text-slate-400">
          {t('showcase.form.sentBody')}
        </p>
        <button
          type="button"
          onClick={() => {
            setFields({ name: '', email: '', message: '' })
            setStatus('idle')
          }}
          className="mt-1 flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-[10px] font-medium text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <RotateCcw size={11} />
          {t('showcase.form.again')}
        </button>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        void submit()
      }}
      className="flex h-full flex-col gap-2.5 overflow-y-auto p-3"
    >
      <p className="text-[11px] font-medium text-slate-900 dark:text-white">
        {t('showcase.form.title')}
      </p>

      {status === 'error' && (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1.5 text-[9px] leading-snug text-rose-600 dark:text-rose-300">
          {t('showcase.form.error')}{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Contacto%20Tunlabs`}
            className="font-medium underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      )}

      <div>
        <label className="mb-1 block text-[9px] font-medium tracking-wide text-slate-500 uppercase">
          {t('showcase.form.name')}
        </label>
        <input
          value={fields.name}
          onChange={(e) => set('name')(e.target.value)}
          placeholder={t('showcase.form.namePlaceholder')}
          className={inputCls(errors.name)}
        />
        {errors.name && (
          <p className="mt-0.5 text-[9px] text-rose-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-[9px] font-medium tracking-wide text-slate-500 uppercase">
          {t('showcase.form.email')}
        </label>
        <input
          type="email"
          value={fields.email}
          onChange={(e) => set('email')(e.target.value)}
          placeholder={t('showcase.form.emailPlaceholder')}
          className={inputCls(errors.email)}
        />
        {errors.email && (
          <p className="mt-0.5 text-[9px] text-rose-400">{errors.email}</p>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <label className="mb-1 block text-[9px] font-medium tracking-wide text-slate-500 uppercase">
          {t('showcase.form.message')}
        </label>
        <textarea
          value={fields.message}
          onChange={(e) => set('message')(e.target.value)}
          placeholder={t('showcase.form.messagePlaceholder')}
          className={`${inputCls(errors.message)} min-h-16 flex-1 resize-none`}
        />
        {errors.message && (
          <p className="mt-0.5 text-[9px] text-rose-400">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 py-2 text-[10px] font-medium text-white transition-colors hover:bg-brand-500 disabled:opacity-50"
      >
        {status === 'sending' ? (
          <Loader2 size={12} className="animate-spin" />
        ) : (
          <SendHorizontal size={12} />
        )}
        {status === 'sending'
          ? t('showcase.form.sending')
          : t('showcase.form.send')}
      </button>
    </form>
  )
}
