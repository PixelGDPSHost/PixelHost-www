import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import cd from "@/public/CheckDollar.png";
import sm from "@/public/SplitMoney.png";
import { SRVCard, SideBar, BBar, Preloader } from "@/components/Components"; // Убедитесь, что Preloader существует
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

// Определяем тип для данных о транзакциях
interface Transaction {
  operation: string;
  sum: number;
  product?: string;
  created_at: string;
}

// Определяем тип для данных о пользователе
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
  const [loading, setLoading] = useState(true); // Состояние для прелоадера
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [user, setUser] = useState<User | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [paymentSystemId, setPaymentSystemId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authCookie = Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA");
      if (authCookie) {
        try {
          const formData = new FormData();
          formData.append("cookie", authCookie);

          const userResponse = await axios.post(
            "https://api.bytenode.cc/user",
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
            setUser(data.user);

            if (router.pathname === "/panel/login") {
              router.push("/panel");
            }

            // Получаем баланс
            const balanceResponse = await axios.post(
              "https://api.bytenode.cc/user/balance",
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
              "https://api.bytenode.cc/user/balance/history",
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
          console.error("Ошибка проверки аутентификации:", error);
          if (
            router.pathname.startsWith("/panel") &&
            router.pathname !== "/panel/login"
          ) {
            router.push("/panel/login");
          }
        } finally {
          setLoading(false); // Завершаем показ прелоадера
        }
      } else {
        router.push("/panel/login");
      }
    };

    checkAuth();
  }, [router]);

  const convertDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const handlePayment = async () => {
    if (!user || !amount || !paymentSystemId) {
      console.error("Отсутствуют необходимые данные для платежа");
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
    formData.append("amount", amount.toString());
    formData.append("us_uname", user.uname);
    formData.append("email", user.mail);
    formData.append("ip", await getUserIp());
    formData.append("payment_id", paymentSystemId);

    try {
      const response = await axios.post(
        "https://pay.bytenode.cc/create-payment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.location) {
        router.push(response.data.location); // Перенаправляем на страницу платежа
      } else {
        toast.error(response.data.detail || "Не удалось создать платеж");
      }
    } catch (error) {
      console.error("Ошибка создания платежа:", error);
      toast.error("Ошибка создания платежа");
    }
  };

  const getUserIp = async (): Promise<string> => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      return response.data.ip;
    } catch (error) {
      console.error("Ошибка получения IP адреса:", error);
      return "0.0.0.0"; // Возвращаем IP по умолчанию, если произошла ошибка
    }
  };

  if (loading) {
    return <Preloader />; // Показ прелоадера во время загрузки
  }

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
                  onValueChange={setPaymentSystemId}
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
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
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
                  style={{ borderRadius: "8px" }}
                />
                <div className="flex flex-col">
                  <p className="text-md">
                    {entry.operation === "replenishment"
                      ? `Пополнение | ${entry.sum}₽`
                      : `${entry.product} | ${entry.sum}₽`}
                  </p>
                  <p className="text-small text-default-500">
                    {convertDate(entry.created_at)}
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
