import { Inter } from 'next/font/google'
import { AuthProvider } from '@/lib/auth-context'
import { CartProvider } from '@/lib/cart-context'
import { Header } from '@/components/header'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

