import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import cd from "@/public/CheckDollar.png";
import sm from "@/public/SplitMoney.png";
import { SRVCard, SideBar, BBar } from "@/components/Components";
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
import { toast } from "react-toastify";

// Define the type for transaction data
interface Transaction {
  operation: string;
  sum: number;
  product?: string;
  created_at: string;
}

// Define the type for user data
interface User {
  id: number;
  mail: string;
  uname: string;
  name: string;
  avatar: string;
}

export default function MyComponent() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<Transaction[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [user, setUser] = useState<User | null>(null); // Store user info
  const [amount, setAmount] = useState<number | null>(null); // Store amount for payment
  const [paymentSystemId, setPaymentSystemId] = useState<string | null>(null); // Store selected payment system

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
            setUser(data.user); // Set user data

            if (router.pathname === "/panel/login") {
              router.push("/panel");
            }

            // Get balance
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

            // Get balance history
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

  const handlePayment = async () => {
    if (!user || !amount || !paymentSystemId) {
      console.error("Missing required payment data");
      return;
    }

    const minAmount = paymentSystemId === "42" ? 500 : 500;

    if (amount < minAmount) {
      toast.error(
        `Минимальная сумма для выбранного способа оплаты: ${minAmount}₽`,
      );
      return;
    }

    const formData = new FormData();
    formData.append("amount", amount.toString()); // Сумма платежа
    // formData.append("payment_id", new Date().toISOString().replace(/[^0-9]/g, "")); // Уникальный payment_id
    formData.append("us_uname", user.uname); // Имя пользователя
    formData.append("email", user.mail); // Электронная почта
    formData.append("ip", await getUserIp()); // IP адрес пользователя
    formData.append("payment_id", paymentSystemId); // ID платежной системы

    try {
      const response = await axios.post(
        "https://pay.bytenode.cc/create-payment", // Убедитесь, что это правильный URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Указываем, что передаем данные формы
          },
        },
      );

      if (response.data.location) {
        router.push(response.data.location); // Перенаправляем на страницу платежа
      } else {
        toast.error(response.data.detail || "Не удалось создать платеж");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Ошибка создания платежа");
    }
  };

  const getUserIp = async (): Promise<string> => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      return response.data.ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return "0.0.0.0"; // Return a default IP if fetching fails
    }
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
                  onValueChange={setPaymentSystemId} // Update the selected payment method
                >
                  <Radio value="42">СБП</Radio>
                  <Radio value="6">Yoomoney</Radio>
                  <Radio value="12">МИР</Radio>
                  <Radio value="32">Visa UAH</Radio>
                  <Radio value="9">MasterCard UAH</Radio>
                </RadioGroup>
                <Input
                  type="number"
                  placeholder="0.00"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">₽</span>
                    </div>
                  }
                  min={paymentSystemId === "42" ? "500" : "150"}
                  isRequired
                  onChange={(e) => setAmount(parseFloat(e.target.value))} // Use onChange instead of onValueChange
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={handlePayment}
                  className="w-full"
                >
                  Перейти к оплате
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <SideBar active="balance"></SideBar>
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
                  style={{ borderRadius: "8px" }} // Use style for radius
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
      <BBar active="balance"></BBar>
    </main>
  );
}
