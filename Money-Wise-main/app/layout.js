import './globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Nav from "@/components/Navigation"
import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from '@/lib/store/auth-context';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WILL BANK',
  description: 'TRABALHO GARRIDO',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer />
            <Nav />
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
