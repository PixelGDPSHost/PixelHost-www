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
  const gotologin = () => {
    r.push("/panel/login");
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
          />
          <p className="pixelhost cursor-pointer navflex" onClick={gotomain}>
            ByteNode
          </p>
        </div>
        <div className="account navflex" onClick={gotologin}>
          {avatar ? (
            <img
              className="account-icon istok-web-bold cursor-pointer"
              src={avatar}
              alt="User Avatar"
            />
          ) : (
            <img
              className="account-icon istok-web-bold cursor-pointer"
              src="https://cdn.bytenode.cc/Account.png"
              alt="Account Icon"
            />
          )}
        </div>
      </nav>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
