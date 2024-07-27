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

// Определите тип данных для транзакций
interface Transaction {
  operation: string;
  sum: number;
  product?: string;
  created_at: string;
}

export default function MyComponent() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<Transaction[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

            // Получаем историю баланса
            const historyResponse = await axios.post(
              "https://api.bytenode.cc/v1/user/balance/history",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              },
            );

            if (historyResponse.data && historyResponse.data.history) {
              setHistory(historyResponse.data.history);
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

  const gotoMain = () => {
    router.push("/panel");
  };

  const gotoSrvs = () => {
    router.push("/panel/servers");
  };

  return (
    <main className="relative dark prekolbg1 min-h-screen-nav max-h-screen-nav">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
      <div className="content flex flex-col items-center min-h-screen-nav max-h-screen-nav p-0-imp">
        <div className="flex justify-center text-center content-center items-center self-center">
          <p className="mr-3">{balance}₽</p>
          <Button color="primary" onPress={onOpen}>
            Пополнить
          </Button>
        </div>
        <h1 className="text-[1.3rem] font-bold text-center mt-5">История</h1>

        {history.length > 0 ? (
          history.map((entry, index) => (
            <Card className="max-w-[400px] mt-5" key={index}>
              <CardHeader className="flex gap-3">
                <Image
                  alt="transaction icon"
                  height={40}
                  src={entry.operation === "replenishment" ? cd : sm}
                  width={40}
                  style={{ borderRadius: "8px" }} // Используем стиль для радиуса
                />
                <div className="flex flex-col">
                  <p className="text-md">
                    {entry.operation === "replenishment"
                      ? `Пополнение | ${entry.sum}₽`
                      : `${entry.product} | ${entry.sum}₽`}
                  </p>
                  <p className="text-small text-default-500">
                    {entry.created_at}
                  </p>
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p className="text-center mt-5">Нет истории баланса</p>
        )}
      </div>
    </main>
  );
}
