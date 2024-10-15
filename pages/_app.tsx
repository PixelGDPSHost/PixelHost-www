"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Avatar, Preloader } from "@/components/Components";
import { preloadAtom } from "@/atoms";
import { useAtom } from "jotai";

// Define the Inter font
const inter = Inter({ subsets: ["latin"] });

// Define the type for the RootLayout props
interface RootLayoutProps {
  Component: React.ElementType;
  pageProps: any;
}

export default function RootLayout({ Component, pageProps }: RootLayoutProps) {
  const r = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);

  const [, setPreloading] = useAtom(preloadAtom);

  // Устанавливаем состояние прелоадера, когда все данные и ресурсы загружены
  useEffect(() => {
    const handleWindowLoad = () => {
      setPreloading(false);
    };

    // Отслеживаем полную загрузку страницы (включая все изображения и ресурсы)
    if (document.readyState === "complete") {
      setPreloading(false);
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    return () => {
      window.removeEventListener("load", handleWindowLoad);
    };
  }, [setPreloading]);

  useEffect(() => {
    const fetchAvatar = async () => {
      const token = Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA");
      if (token) {
        const formData = new FormData();
        formData.append("cookie", token);

        try {
          const response = await axios.post(
            "http://127.0.0.1:3443/user",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );

          if (response.data) {
            setAvatar(response.data.user.avatar);
          }
        } catch (error) {
          console.error("Error fetching avatar:", error);
        }
      }
    };

    // Initial fetch
    fetchAvatar();
    const intervalId = setInterval(fetchAvatar, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const gotomain = () => {
    r.push("/");
  };

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
      <nav className="z-40 navflex">
        <div className="flex navflex">
          <img
            src="https://cdn.bytenode.cc/pixel.png"
            className="logo"
            onClick={gotomain}
            alt="Logo"
          />
          <p className="pixelhost cursor-pointer navflex" onClick={gotomain}>
            ByteNode
          </p>
        </div>
        <Avatar />
      </nav>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
  );
}
