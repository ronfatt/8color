import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { TopNav } from '@/components/navigation/TopNav'
import { BottomNav } from '@/components/navigation/BottomNav'
import { AmbientBackground } from '@/components/ui/AmbientBackground'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '8MIRROR｜八镜 · 个人状态罗盘',
  description: '8种状态 · 8面镜像 · 1把钥匙。未来未定，先看清现在。',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f9fc] text-[#0f172a] selection:bg-blue-100 selection:text-blue-900">
        {/* Warm Luminous Pastel Ambient Background */}
        <AmbientBackground />

        {/* Desktop Navigation */}
        <TopNav />

        {/* Main Mobile-first App Shell */}
        <main className="flex-1 w-full max-w-lg mx-auto pt-4 md:pt-20 pb-22 md:pb-12 flex flex-col px-3 sm:px-4">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </body>
    </html>
  )
}
