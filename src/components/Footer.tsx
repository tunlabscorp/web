// Copyright (c) Tunlabs Corp. All rights reserved.

import { useTranslation } from 'react-i18next'
import logoClear from '../assets/logo-clear-mode.png'
import logoDark from '../assets/logo-dark-mode.png'

const year = new Date().getFullYear()

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-slate-200 py-10 dark:border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div>
          <img
            src={logoClear}
            alt="Tunlabs"
            className="h-6 w-auto dark:hidden"
          />
          <img
            src={logoDark}
            alt="Tunlabs"
            className="hidden h-6 w-auto dark:block"
          />
          <p className="mt-2 text-xs text-slate-500">{t('footer.tagline')}</p>
        </div>
        <p className="text-xs text-slate-500">
          © {year} Tunlabs. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
