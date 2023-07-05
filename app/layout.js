import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/GlobalState/Provider";
import Notification from "@/components/Notification";
import ChatsAll from "@/components/ChatsAll";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chatify",
  description: "Instant Web Chat Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Notification />
          <div className="sm:flex md:flex lg:flex h-[100vh] w-[100vw]">
            <div className={`w-full sm:w-[40vw] md:w-[30vw] lg:w-[25vw]`}>
              <ChatsAll />
            </div>
            <div>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
