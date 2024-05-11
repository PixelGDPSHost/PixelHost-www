import { Inter } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from '@nextui-org/react'
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ Component, pageProps }) {
  return (
          <NextUIProvider>
              <nav>
                  <img src="https://cdn.pixelhost.one/pixel.png" className="logo" />
                  <p className="pixelhost">PixelHost</p>
                  <div className="account">
                      <img className="account-icon istok-web-bold" src="https://cdn.pixelhost.one/Account.png" alt="Account Icon" />
                  </div>
              </nav>
              <Component {...pageProps} />
              <footer className="bg-black h-[311px] p-[35px]">
                  <center>
                      <img src="https://cdn.pixelhost.one/pixel.png" className="logo mb-[4px]" />
                      <p className="ftext font-semibold">© Copyright Infinitium 2022-2024</p>
                  </center>
                  <hr className="hr"/>
                  <h1 className="text-[20px] font-bold">О нас</h1>
                  <Link className="cursor-pointer" href="/terms">Политика конфидициальности</Link><br/>
                  <Link className="cursor-pointer" href="https://status.pixelhost.one/">Мониторинг</Link><br/>
                  <div className="flex mt-[40px]">
                      <img src="https://cdn.pixelhost.one/image%204.png"/>
                      <img src="https://cdn.pixelhost.one/image%205.png"/>
                      <img src="https://cdn.pixelhost.one/image%206.png"/>
                  </div>
              </footer>
          </NextUIProvider>
  );
}
