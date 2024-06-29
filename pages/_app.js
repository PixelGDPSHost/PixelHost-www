"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from '@nextui-org/react'
import Link from "next/link";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ Component, pageProps }) {
    const r = useRouter()
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const fetchAvatar = async () => {
            const cookie = document.cookie.split('; ').find(row => row.startsWith('PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA='));
            if (cookie) {
                const formData = new FormData();
                formData.append('token', cookie.split('=')[1]);

                try {
                    const response = await fetch('https://api.bytenode.cc/v1/user', {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setAvatar(data.avatar);
                    }
                } catch (error) {
                    console.error('Error fetching avatar:', error);
                }
            }
        };

        // Initial fetch
        fetchAvatar();

        const intervalId = setInterval(fetchAvatar, 3000);

        return () => clearInterval(intervalId);
    }, []);

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
        r.push("https://www.youtube.com/watch?v=1Z317S-PqDc")
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
                    <img src="https://cdn.bytenode.cc/pixel.png" className="logo" onClick={gotomain}/>
                    <p className="pixelhost">ByteNode</p>
                </div>
                <div className="account" onClick={gotologin}>
                    {avatar ? (
                        <img className="account-icon istok-web-bold cursor-pointer" src={avatar} alt="User Avatar"/>
                    ) : (
                        <img className="account-icon istok-web-bold cursor-pointer" src="https://cdn.bytenode.cc/Account.png" alt="Account Icon"/>
                    )}
                </div>
            </nav>
            <Component {...pageProps} />
            <footer className="bg-black h-[311px] p-[35px]">
                <center>
                    <img src="https://cdn.bytenode.cc/pixel.png" className="logo mb-[4px]" />
                    <p className="ftext font-semibold">© Copyright Infinitium 2022-2024</p>
                </center>
                <hr className="hr"/>
                <h1 className="text-[20px] font-bold mt-[10px]">О нас</h1>
                <p className="cursor-pointer" onClick={gototerms}>Политика конфидициальности</p>
                <Link className="cursor-pointer" href="https://status.pixelhost.one/">Мониторинг</Link><br/>
                <div className="flex mt-[40px]" onClick={gotoBobsbin}>
                    <img src="https://cdn.bytenode.cc/image%204.png"/>
                    <img src="https://cdn.bytenode.cc/image%205.png"/>
                    <img src="https://cdn.bytenode.cc/image%206.png"/>
                </div>
            </footer>
        </NextUIProvider>
    );
}
