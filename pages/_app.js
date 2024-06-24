"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from '@nextui-org/react'
import Link from "next/link";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ Component, pageProps }) {
    const r = useRouter()
    const gotomain = () => {
        r.push("/")
    }
    const gototerms = () => {
        r.push("/terms")
    }
    const gotologin = () => {
        r.push("/panel/login")
    }
    const gotoBobsbin = () => {
        r.push("https://tenor.com/view/братюльники-pexwer-pexwer9-братцы-брат-gif-12471208367258920906")
    }
  return (
          <NextUIProvider>
              <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
              />
              <nav className="z-40">
                  <div className="flex">
                      <img src="https://cdn.pixelhost.one/pixel.png" className="logo" onClick={gotomain}/>
                      <p className="pixelhost">PixelHost</p>
                  </div>
                  <div className="account" onClick={gotologin}>
                      <img className="account-icon istok-web-bold cursor-pointer" src="https://cdn.pixelhost.one/Account.png" alt="Account Icon"/>
                  </div>
              </nav>
              <Component {...pageProps} />
              <footer className="bg-black h-[311px] p-[35px]">
                  <center>
                      <img src="https://cdn.pixelhost.one/pixel.png" className="logo mb-[4px]" />
                      <p className="ftext font-semibold">© Copyright Infinitium 2022-2024</p>
                  </center>
                  <hr className="hr"/>
                  <h1 className="text-[20px] font-bold mt-[10px]">О нас</h1>
                  <p className="cursor-pointer" onClick={gototerms}>Политика конфидициальности</p>
                  <Link className="cursor-pointer" href="https://status.pixelhost.one/">Мониторинг</Link><br/>
                  <div className="flex mt-[40px]" onClick={gotoBobsbin}>
                      <img src="https://cdn.pixelhost.one/image%204.png"/>
                      <img src="https://cdn.pixelhost.one/image%205.png"/>
                      <img src="https://cdn.pixelhost.one/image%206.png"/>
                      <a href="https://freekassa.ru" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.freekassa.ru/banners/small-dark-2.png" title="Прием платежей" />
                      </a>
                  </div>
              </footer>
          </NextUIProvider>
  );
}
