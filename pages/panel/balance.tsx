import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import cd from "@/public/CheckDollar.png";
import sm from "@/public/SplitMoney.png";
import { SRVCard, SideBar } from "@/components/Components";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { Card, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function MyComponent() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      const authCookie = Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA");
      if (authCookie) {
        try {
          const formData = new FormData();
          formData.append("cookie", authCookie);

          const userResponse = await axios.post(
            "https://api.bytenode.cc/v1/user",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );

          const { data } = userResponse;
          if (
            data.user &&
            data.user.id &&
            data.user.mail &&
            data.user.uname &&
            data.user.name &&
            data.user.avatar
          ) {
            setIsAuthenticated(true);
            if (router.pathname === "/panel/login") {
              router.push("/panel");
            }

            // Получаем баланс
            const balanceResponse = await axios.post(
              "https://api.bytenode.cc/v1/user/balance",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              },
            );

            if (balanceResponse.data && balanceResponse.data.balance) {
              setBalance(balanceResponse.data.balance);
            }
          } else {
            if (
              router.pathname.startsWith("/panel") &&
              router.pathname !== "/panel/login"
            ) {
              router.push("/panel/login");
            }
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
          if (
            router.pathname.startsWith("/panel") &&
            router.pathname !== "/panel/login"
          ) {
            router.push("/panel/login");
          }
        }
      } else {
        router.push("/panel/login");
      }
    };

    checkAuth();
  }, [router]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const gotoMain = () => {
    router.push("/panel");
  };

  const gotoSrvs = () => {
    router.push("/panel/servers");
  };

  return (
    <main className="relative dark prekolbg1">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={"center"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Пополнение
              </ModalHeader>
              <ModalBody>
                <RadioGroup
                  label="Способ Оплаты"
                  orientation="horizontal"
                  isRequired
                >
                  <Radio value="42">СБП</Radio>
                  <Radio value="6">Yoomoney</Radio>
                  <Radio value="12">МИР</Radio>
                </RadioGroup>
                <Input
                  type="number"
                  placeholder="0.00"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">₽</span>
                    </div>
                  }
                  min="150"
                  isRequired
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose} className="w-full">
                  Перейти к оплате
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <SideBar></SideBar>
      <div className="flex flex-col justify-center content-center items-center">
        <div className="flex justify-center text-center content-center items-center self-center mt-[106.96px]">
          <p className="mr-3">{balance}₽</p>
          <Button color="primary" onPress={onOpen}>
            Пополнить
          </Button>
        </div>
        <div className="bg-black min-w-[330px] max-w-[330px] mt-5 p-[10px] rounded-t-large rounded-b-large">
          <h1 className="text-[1.3rem] font-bold text-center">История</h1>

          <p>API истории будет 23.07.2024</p>

          {/*<Card className="max-w-[400px] mt-5">*/}
          {/*  <CardHeader className="flex gap-3">*/}
          {/*    <Image*/}
          {/*      alt="nextui logo"*/}
          {/*      height={40}*/}
          {/*      radius="sm"*/}
          {/*      src={cd}*/}
          {/*      width={40}*/}
          {/*    />*/}
          {/*    <div className="flex flex-col">*/}
          {/*      <p className="text-md">Пополнение | 1999₽</p>*/}
          {/*      <p className="text-small text-default-500">20.08.2024 12:52</p>*/}
          {/*    </div>*/}
          {/*  </CardHeader>*/}
          {/*</Card>*/}
          {/*<Card className="max-w-[400px] mt-5">*/}
          {/*  <CardHeader className="flex gap-3">*/}
          {/*    <Image*/}
          {/*      alt="nextui logo"*/}
          {/*      height={40}*/}
          {/*      radius="sm"*/}
          {/*      src={sm}*/}
          {/*      width={40}*/}
          {/*    />*/}
          {/*    <div className="flex flex-col">*/}
          {/*      <p className="text-md">PixelDash - Ascend | -79₽</p>*/}
          {/*      <p className="text-small text-default-500">20.08.2024 12:52</p>*/}
          {/*    </div>*/}
          {/*  </CardHeader>*/}
          {/*</Card>*/}
          {/*<Card className="max-w-[400px] mt-5">*/}
          {/*  <CardHeader className="flex gap-3">*/}
          {/*    <Image*/}
          {/*      alt="nextui logo"*/}
          {/*      height={40}*/}
          {/*      radius="sm"*/}
          {/*      src={sm}*/}
          {/*      width={40}*/}
          {/*    />*/}
          {/*    <div className="flex flex-col">*/}
          {/*      <p className="text-md">ByteNode BOT - Byte | -49₽</p>*/}
          {/*      <p className="text-small text-default-500">25.07.2024 12:52</p>*/}
          {/*    </div>*/}
          {/*  </CardHeader>*/}
          {/*</Card>*/}
        </div>
      </div>
    </main>
  );
}
