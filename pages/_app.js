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
import { Avatar } from "@/components/Components";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ Component, pageProps }) {
  const r = useRouter();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      const token = Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA");
      if (token) {
        const formData = new FormData();
        formData.append("cookie", token);

        try {
          const response = await axios.post(
            "https://api.bytenode.cc/v1/user",
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
    <NextUIProvider className="dark text-foreground bg-background">
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
