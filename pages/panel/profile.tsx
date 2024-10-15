import * as React from "react";
import { useRouter } from "next/router";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Card,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BBar, SideBar } from "@/components/Components";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import Image from "next/image";
import PencilIcon from "@/public/suhpaek.png";
import { Skeleton } from "@nextui-org/skeleton";

const Home = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(true); // New state for loading
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchAvatar = async () => {
    const token = Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA");
    if (token) {
      const formData = new FormData();
      formData.append("cookie", token);

      try {
        const response = await axios.post(
          "https://api.bytenode.cc/user",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (response.data) {
          setAvatar(response.data.user.avatar);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

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
            if (router.pathname === "/panel/login") {
              router.push("/panel");
            }

            setUsername(data.user.uname);

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

            // Set loading to false after fetching data
            setLoading(false);
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
          setLoading(false);
        }
      } else {
        router.push("/panel/login");
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    // Initial fetch
    fetchAvatar();
    const intervalId = setInterval(fetchAvatar, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const authCookie = Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA");
    const formData = new FormData();
    formData.append("cookie", authCookie!);
    formData.append("file", file);

    try {
      await axios.post("https://api.bytenode.cc/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Successfully updated avatar
      toast.success("Аватар успешно изменен!");
      // Fetch the updated avatar
      fetchAvatar();
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error("Не удалось изменить аватар.");
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLInputElement;
      handleFileChange({ target } as React.ChangeEvent<HTMLInputElement>);
    });

    fileInput.click();
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <main className="relative dark prekolbg1 min-h-screen-nav max-h-screen-nav">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Изменение Пароля
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Старый Пароль"
                  variant="bordered"
                  placeholder="**************"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  autoComplete="off"
                  type={isVisible ? "text" : "password"}
                  className="w-full mb-[11px]"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input
                  label="Новый Пароль"
                  variant="bordered"
                  placeholder="**************"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  autoComplete="off"
                  type={isVisible ? "text" : "password"}
                  className="w-full mb-[11px]"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  label="Повторите Новый Пароль"
                  variant="bordered"
                  placeholder="**************"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  autoComplete="off"
                  type={isVisible ? "text" : "password"}
                  className="w-full mb-[11px]"
                  onChange={(e) => setRepeatPassword(e.target.value)}
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
      <SideBar active="profile" />
      <div className="content flex min-h-screen-nav max-h-screen-nav">
        <Card className="p-3 crd">
          <h1 className="mb-4">Аккаунт</h1>
          <Divider className="mb-3" />
          <div className="relative flex gap-3">
            <div className="relative">
              {loading ? (
                <Skeleton className="rounded-xl avatarochka w-[150px] h-[150px]" />
              ) : (
                <Image
                  src={avatar || "/default-avatar.png"}
                  className="rounded-xl avatarochka"
                  alt="avatar"
                  width={150}
                  height={150}
                />
              )}
              <div
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 bg-black bg-opacity-50 p-1.5 rounded-full cursor-pointer flex items-center justify-center"
                style={{
                  border: "2px solid white",
                }}
              >
                <Image
                  className="h-[20px] w-[20px]"
                  src={PencilIcon}
                  alt="Edit"
                />
              </div>
            </div>
            <div className="gap-4 flex items-center justify-center flex-col">
              {loading ? (
                <Skeleton className="w-[150px] h-[40px]" />
              ) : (
                <Input
                  value={username}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-xl">@</span>
                    </div>
                  }
                  isDisabled={true}
                />
              )}
              {loading ? (
                <Skeleton className="w-[150px] h-[40px]" />
              ) : (
                <Input
                  value={balance}
                  startContent={
                    <span className="text-default-400 text-xl">₽</span>
                  }
                  isDisabled={true}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
      <BBar active="profile"></BBar>
    </main>
  );
};

export default Home;
