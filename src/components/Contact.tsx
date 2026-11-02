// Copyright (c) Tunlabs Corp. All rights reserved.

import { useTranslation } from 'react-i18next'
import { ArrowRight, Mail } from 'lucide-react'
import { Reveal } from './Reveal'
import { Particles } from './Particles'

export function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="relative overflow-hidden border-t border-slate-200 py-28 dark:border-white/5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[640px] -translate-x-1/2 animate-float-y rounded-full bg-brand-500/10 blur-[120px] dark:bg-brand-600/15"
      />
      <Particles className="opacity-60" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl dark:text-white">
            {t('contact.heading')}
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">{t('contact.subheading')}</p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={`mailto:${t('contact.email')}`}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-500"
            >
              {t('contact.cta')}
              <ArrowRight size={16} />
            </a>
            <a
              href={`mailto:${t('contact.email')}`}
              className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <Mail size={16} />
              {t('contact.email')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
