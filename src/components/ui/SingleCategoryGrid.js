import React from "react";
import { AiFillStar } from "react-icons/ai";
import {
   EditOutlined,
   EllipsisOutlined,
   SettingOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import Image from "next/image";
import cardImage from "../../assets/images/product.webp";
import { BsCpu, BsDeviceSsd, BsKeyboard, BsMotherboard } from "react-icons/bs";
import { LuMemoryStick } from "react-icons/lu";
import { PiMonitor } from "react-icons/pi";
import { GiEnergyTank } from "react-icons/gi";
import Link from "next/link";
const SingleCategoryGrid = ({ category }) => {
   const icon =
      category.name === "CPU/Processor" ? (
         <BsCpu className="text-4xl m-auto"></BsCpu>
      ) : category.name === "Motherboard" ? (
         <BsMotherboard className="text-4xl m-auto"></BsMotherboard>
      ) : category.name === "RAM" ? (
         <LuMemoryStick className="text-4xl m-auto"></LuMemoryStick>
      ) : category.name === "Storage Device" ? (
         <BsDeviceSsd className="text-4xl m-auto"></BsDeviceSsd>
      ) : category.name === "Monitor" ? (
         <PiMonitor className="text-4xl m-auto"></PiMonitor>
      ) : category.name === "Others" ? (
         <BsKeyboard className="text-4xl m-auto"></BsKeyboard>
      ) : category.name === "Power Supply Unit" ? (
         <GiEnergyTank className="text-4xl m-auto"></GiEnergyTank>
      ) : (
         ""
      );

   return (
      <Link href={`/category/${category.slug}`}>
         <Card size="small" hoverable className=" shadow-md">
            {icon}
            <h3 className="text-center mt-2">{category.name}</h3>
         </Card>
      </Link>
   );
};
export default SingleCategoryGrid;
