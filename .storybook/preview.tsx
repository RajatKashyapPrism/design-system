/// <reference types="vite/client" />
import React from 'react'
import type { Preview } from '@storybook/react-vite'

// Mobile responsive scale overrides (shared across all brands)
import '../src/tokens/mobile/responsive.css'

// Brand theme URLs — Vite resolves these to stable asset URLs at build time
import oyoUrl from '../src/tokens/desktop/oyo/theme.css?url'
import belvillaUrl from '../src/tokens/desktop/belvilla/theme.css?url'
import checkinUrl from '../src/tokens/desktop/checkin/theme.css?url'
import dancenterUrl from '../src/tokens/desktop/dancenter/theme.css?url'
import motel6Url from '../src/tokens/desktop/motel 6/theme.css?url'
import studio6Url from '../src/tokens/desktop/studio 6/theme.css?url'

const brandUrls: Record<string, string> = {
  oyo: oyoUrl,
  belvilla: belvillaUrl,
  checkin: checkinUrl,
  dancenter: dancenterUrl,
  'motel-6': motel6Url,
  'studio-6': studio6Url,
}

function applyBrandTheme(brand: string) {
  const url = brandUrls[brand] ?? brandUrls['oyo']
  let link = document.querySelector<HTMLLinkElement>('link[data-prism-brand]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.setAttribute('data-prism-brand', '')
    document.head.appendChild(link)
  }
  if (link.href !== url) link.href = url
}

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Brand theme',
      defaultValue: 'oyo',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'oyo', title: 'OYO' },
          { value: 'belvilla', title: 'Belvilla' },
          { value: 'checkin', title: 'CheckIn' },
          { value: 'dancenter', title: 'Dancenter' },
          { value: 'motel-6', title: 'Motel 6' },
          { value: 'studio-6', title: 'Studio 6' },
        ],
        dynamicTitle: true,
      },
    },
    themeMode: {
      description: 'Light or dark mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme Mode',
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const brand = (context.globals.brand as string) || 'oyo'
      const themeMode = (context.globals.themeMode as string) || 'light'

      applyBrandTheme(brand)

      if (themeMode === 'dark') {
        document.documentElement.setAttribute('data-theme-mode', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme-mode')
      }

      return <Story />
    },
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
