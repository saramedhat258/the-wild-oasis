import Header from "./_components/Header";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import '@/app/_styles/globals.css'
import {Josefin_Sans} from "next/font/google"

const josefin =Josefin_Sans({
  subsets:["latin"],
  display:"swap",
})
export const metadata = {
  /* title: 'The Wild Oasis' */
  title: {
    template: "%s The Wild Oasis",
    default: "The Wild Oasis"
  },
  description: 
  "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
}
export default function rootLayout({ children }) {
  return (
    <html>
      <body className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen antialiased flex flex-col`}>
        <Header/>
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  )
}
