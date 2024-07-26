"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Bounce, toast } from "react-toastify";
import Image from "next/image";
import pezda5 from "@/public/Rectangle 186.png";
import pezda6 from "@/public/GeometryDash.png";
import pezda7 from "@/public/Rectangle 190.png";
import pezda8 from "@/public/Server.png";
import Link from "next/link";
import { useRouter } from "next/router";
import pezda from "@/public/DashboardLayout.png";
import pezda1 from "@/public/Server.png";
import pezda2 from "@/public/MoneyBag.png";
import pezda3 from "@/public/User.png";
import Cookies from "js-cookie";
import axios from "axios";

// Props type for SCard component
interface SCardP {
  title: string;
  lower: string;
  iconimg: string;
}

export const SCard: React.FC<SCardP> = ({ title, lower, iconimg }) => {
  const niconimg = "https://cdn.bytenode.cc/" + iconimg;
  return (
    <div className="flex items-center ml-10 mb-[43.72px] font-medium">
      <div className="w-[80px] h-[79.48px] bg-[#171D29] mr-[25px] justify-center items-center flex rounded-[15px]">
        <img src={niconimg} className="w-[45px] h-[44.71px]" />
      </div>
      <div>
        <h1 className="text-[20px] mb-[18px]">{title}</h1>
        <p className="max-w-[364px] text-[14px]">{lower}</p>
      </div>
    </div>
  );
};

// Props type for TDCard component
interface TDCardP {
  title: string;
  price: string;
  ozu: string;
  disk: string;
  db: string;
  backup: string;
  color: string;
}

export const TDCard: React.FC<TDCardP> = ({
  title,
  price,
  ozu,
  disk,
  db,
  backup,
  color,
}) => {
  const notify = () => {
    toast.error("Жди до 30.06.2024!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <div>
      <div
        className="card-discord"
        style={{ borderTop: `15px solid ${color}` }}
      >
        <h1 className="font-light text-3xl mb-[17.4px]">{title}</h1>
        <div className="flex text-center mb-[33px] items-center">
          <p>{price} ₽</p>
          <p className="text-[12px]">/ Месяц</p>
        </div>
        <p className="flex">
          <img
            className="w-[25px] h-[25px] mb-[18px]"
            src="https://cdn.bytenode.cc/icons228%2FMemory%20Slot.png"
            alt="ОЗУ"
          ></img>
          ОЗУ: {ozu}
        </p>
        <p className="flex">
          <img
            className="w-[25px] h-[25px] mb-[18px]"
            src="https://cdn.bytenode.cc/icons228%2FHDD.png"
            alt="Диск"
          ></img>
          Диск: {disk}
        </p>
        <p className="flex">
          <img
            className="w-[25px] h-[25px] mb-[18px]"
            src="https://cdn.bytenode.cc/icons228%2FDatabase.png"
            alt="БД"
          ></img>
          БД: {db}
        </p>
        <p className="flex">
          <img
            className="w-[25px] h-[25px] mb-[31px]"
            src="https://cdn.bytenode.cc/icons228%2FCloud%20Storage.png"
            alt="Бэкапы"
          ></img>
          Бэкапы: {backup}
        </p>
        <Button color="primary" onClick={notify}>
          Выбрать
        </Button>
      </div>
    </div>
  );
};

// Props type for SRVCard component
interface SRVCardP {
  title: string;
  type: string;
  oplachen: string;
  status: string;
}

export const SRVCard: React.FC<SRVCardP> = ({
  title,
  type,
  oplachen,
  status,
}) => {
  let buttonColor: "default" | "primary";
  let tstatus: string;
  let disab: boolean;
  let imageSrc: string;

  switch (type) {
    case "discord":
      imageSrc = pezda7.src;
      break;
    case "gdps":
      imageSrc = pezda6.src;
      break;
    case "mc":
      imageSrc = pezda5.src;
      break;
    default:
      imageSrc = pezda8.src;
  }

  switch (status) {
    case "Устанавливается":
      buttonColor = "default";
      tstatus = "Устанавливается";
      disab = true;
      break;
    case "Установлен":
      buttonColor = "primary";
      tstatus = "Управлять Сервером";
      disab = false;
      break;
    default:
      buttonColor = "default";
      tstatus = "Неизвестно";
      disab = true;
  }

  return (
    <Card className="max-w-[280px] min-w-[280px] max-h-[133px] min-h-[133px] opmt">
      <CardHeader className="flex items-center text-center content-center justify-center gap-3">
        <Image
          alt="server"
          height={40}
          className="radius-sm"
          src={imageSrc}
          width={40}
        />
        <center>
          <div className="flex flex-col">
            <p className="text-md">{title}</p>
            <p className="text-small text-default-500">Оплачен до {oplachen}</p>
          </div>
        </center>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="flex items-center justify-center">
          <Button color={buttonColor} isLoading={disab}>
            {tstatus}
          </Button>
        </p>
      </CardBody>
    </Card>
  );
};

// Props type for Avatar component
interface AvatarP {
  className?: string;
}

export const Avatar: React.FC<AvatarP> = ({ className }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

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

    // Initial fetch
    fetchAvatar();
    const intervalId = setInterval(fetchAvatar, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const gotologin = () => {
    router.push("/panel/login");
  };

  const logout = () => {
    Cookies.remove("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA");
    gotologin();
  };

  const gotopanel = () => {
    router.push("/panel");
  };

  const gotoprofile = () => {
    router.push("/panel/profile");
  };

  if (!isAuthenticated) {
    return (
      <div className={`navflex rounded-full ${className}`}>
        <img
          className="h-[30px] w-[30px] istok-web-bold cursor-pointer account"
          src="https://cdn.bytenode.cc/Account.png"
          alt="Account Icon"
          onClick={gotologin}
        />
      </div>
    );
  }

  return (
    <div className={`navflex ${className}`}>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <img
            className="h-[30px] w-[30px] istok-web-bold cursor-pointer rounded-full"
            src={avatar || "https://cdn.bytenode.cc/Account.png"}
            alt="User Avatar"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User menu">
          <DropdownItem key="profile" onClick={gotoprofile}>
            Профиль
          </DropdownItem>
          <DropdownItem key="logout" onClick={logout} className="text-red-600">
            Выйти
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
};

Avatar.defaultProps = {
  className: "",
};

// Avatar in Profile
export const AvatarinProfile: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const r = useRouter();

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

  return (
    <div className={`nonavflex`}>
      {avatar ? (
        <img
          className="h-[30px] w-[30px] rounded-full istok-web-bold"
          src={avatar}
          alt="User Avatar"
        />
      ) : (
        <img
          className="h-[30px] w-[30px] rounded-full istok-web-bold account"
          src="https://cdn.bytenode.cc/Account.png"
          alt="Account Icon"
        />
      )}
    </div>
  );
};

export const SideBar = () => {
  const router = useRouter();

  const gotoMain = () => {
    router.push("/panel");
  };

  const gotoSrvs = () => {
    router.push("/panel/servers");
  };

  const gotoBalance = () => {
    router.push("/panel/balance");
  };

  const gotoProfile = () => {
    router.push("/panel/profile");
  };

  return (
    <div className="w-[60px] min-h-screen-nav max-h-screen-nav sbarbg p-[12.5px] flex flex-col items-center borderr8 absolute left-0 top-0 sbar">
      <div
        className="w-[35px] h-[35px] bg-[#110F16] mt-[15px] borderr8 flex items-center justify-center cursor-pointer"
        onClick={gotoMain}
      >
        <Image src={pezda} alt="DashboardLayout" />
      </div>
      <div
        className="w-[35px] h-[35px] bg-[#110F16] mt-[15px] borderr8 flex items-center justify-center cursor-pointer"
        onClick={gotoSrvs}
      >
        <Image src={pezda1} alt="DashboardLayout" />
      </div>
      <div
        className="w-[35px] h-[35px] bg-[#110F16] mt-[15px] borderr8 flex items-center justify-center cursor-pointer"
        onClick={gotoBalance}
      >
        <Image src={pezda2} alt="DashboardLayout" />
      </div>
      <div
        className="w-[35px] h-[35px] bg-[#110F16] mt-[15px] borderr8 flex items-center justify-center cursor-pointer"
        onClick={gotoProfile}
      >
        <Image src={pezda3} alt="DashboardLayout" />
      </div>
    </div>
  );
};

export const Footer = () => {
  const r = useRouter();

  const gototerms = () => {
    r.push("/terms");
  };

  const gotoBobsbin = () => {
    r.push("https://www.youtube.com/watch?v=1Z317S-PqDc");
  };
  return (
    <footer className="bg-black h-[311px] p-[35px]">
      <center>
        <img
          src="https://cdn.bytenode.cc/pixel.png"
          className="logo mb-[4px]"
        />
        <p className="ftext font-semibold">© Copyright Infinitium 2022-2024</p>
      </center>
      <hr className="hr" />
      <h1 className="text-[20px] font-bold mt-[10px]">О нас</h1>
      <p className="cursor-pointer" onClick={gototerms}>
        Политика конфидициальности
      </p>
      <Link className="cursor-pointer" href="https://status.pixelhost.one/">
        Мониторинг
      </Link>
      <br />
      <div className="flex mt-[40px]" onClick={gotoBobsbin}>
        <img src="https://cdn.bytenode.cc/image%204.png" />
        <img src="https://cdn.bytenode.cc/image%205.png" />
        <img src="https://cdn.bytenode.cc/image%206.png" />
      </div>
    </footer>
  );
};
