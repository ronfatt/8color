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
  title: 'STATE/8 — Personal Pattern Engine',
  description: '8 Colors · 8 Mirrors · 1 Key. Don\'t predict the future. Read the pattern.',
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#08080a] text-[#f4f4f7] selection:bg-white/20 selection:text-white">
        {/* Floating 8-color orbital background */}
        <AmbientBackground />

        {/* Global Desktop Navigation */}
        <TopNav />

        {/* Main Application Content Container */}
        <main className="flex-1 w-full pt-16 md:pt-24 pb-24 md:pb-16 flex flex-col">
          {children}
        </main>

        {/* Global Mobile Bottom Navigation */}
        <BottomNav />
      </body>
    </html>
  )
}
