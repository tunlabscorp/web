// Copyright (c) Tunlabs Corp. All rights reserved.

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import logoClear from '../assets/logo-clear-mode.png'
import logoDark from '../assets/logo-dark-mode.png'

const links = [
  { key: 'services', href: '#services' },
  { key: 'process', href: '#process' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#contacto' },
] as const

export function Navbar() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  const langButton = (lng: 'en' | 'es') => (
    <button
      key={lng}
      type="button"
      onClick={() => i18n.changeLanguage(lng)}
      className={`rounded px-2 py-1 uppercase transition-colors ${
        i18n.language === lng
          ? 'text-slate-900 dark:text-white'
          : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
      }`}
    >
      {lng}
    </button>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-white/5 dark:bg-slate-950/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" aria-label="Tunlabs" className="flex items-center">
          <img
            src={logoClear}
            alt="Tunlabs"
            className="h-7 w-auto dark:hidden"
          />
          <img
            src={logoDark}
            alt="Tunlabs"
            className="hidden h-7 w-auto dark:block"
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {t(`nav.${key}`)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <div className="flex items-center gap-1 text-xs font-medium">
            {langButton('en')}
            {langButton('es')}
          </div>
          <a
            href="#contacto"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-500"
          >
            {t('nav.cta')}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="text-slate-600 dark:text-slate-300"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div
        className={`grid overflow-hidden border-t transition-all duration-300 ease-out md:hidden ${
          open
            ? 'grid-rows-[1fr] border-slate-200 opacity-100 dark:border-white/5'
            : 'grid-rows-[0fr] border-transparent opacity-0'
        }`}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-4 bg-white px-6 py-4 dark:bg-slate-950">
            {links.map(({ key, href }, i) => (
              <a
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms' }}
                className={`text-sm text-slate-600 transition-all duration-300 dark:text-slate-300 ${
                  open
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-2 opacity-0'
                }`}
              >
                {t(`nav.${key}`)}
              </a>
            ))}
            <div
              className={`flex items-center gap-2 pt-2 transition-all duration-300 ${
                open
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-2 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${60 + links.length * 40}ms` : '0ms' }}
            >
              {langButton('en')}
              {langButton('es')}
            </div>
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${100 + links.length * 40}ms` : '0ms' }}
              className={`rounded-lg bg-brand-600 px-4 py-2 text-center text-sm font-medium text-white transition-all duration-300 ${
                open
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-2 opacity-0'
              }`}
            >
              {t('nav.cta')}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
