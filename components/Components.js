import React from "react";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Bounce, toast } from "react-toastify";
import Image from "next/image";
import pezda5 from "@/public/Rectangle 186.png";
import pezda6 from "@/public/Rectangle 188.png";
import pezda7 from "@/public/Rectangle 190.png";
import pezda8 from "@/public/Server.png";

export const SCard = ({ title, lower, iconimg }) => {
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

export const TDCard = ({
  title,
  price,
  ozu,
  disk,
  db,
  backup,
  lower,
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
        <p>{lower}</p>
        <Button color="primary" onClick={notify}>
          Выбрать
        </Button>
      </div>
    </div>
  );
};

export const SRVCard = ({ title, type, oplachen, status }) => {
  let buttonColor;
  let tstatus;
  let disab;
  let imageSrc;
  switch (type) {
    case "discord":
      imageSrc = pezda7;
      break;
    case "gdps":
      imageSrc = pezda6;
      break;
    case "mc":
      imageSrc = pezda5;
      break;
    default:
      imageSrc = pezda8;
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
    <Card className="max-w-[300px] min-w-[300px] max-h-[133px] min-h-[133px] opmt">
      <CardHeader className="flex gap-3">
        <Image alt="server" height={40} radius="sm" src={imageSrc} width={40} />
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">Оплачен до {oplachen}</p>
        </div>
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
