import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { BRAND_LOGO_URL } from '@/components/estou-em-dia/brand-logo'
import './globals.css'

export const metadata: Metadata = {
  title: 'Estou em Dia | Limpe seu Nome e Aumente seu Score',
  description: 'Limpeza de CPF e CNPJ, restauração de score em até 30 dias. 100% dentro da lei. Limpe seu nome agora, pague suas dívidas depois!',
  icons: {
    icon: [{ url: BRAND_LOGO_URL, type: 'image/png' }],
    shortcut: [{ url: BRAND_LOGO_URL, type: 'image/png' }],
    apple: [{ url: BRAND_LOGO_URL, type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth overflow-x-hidden">
      <body className="min-w-0 overflow-x-hidden font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
