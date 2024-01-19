import React from "react";
import { BsCpu, BsDeviceSsd, BsKeyboard, BsMotherboard } from "react-icons/bs";
import { LuMemoryStick } from "react-icons/lu";
import { PiMonitor } from "react-icons/pi";
import { GiEnergyTank } from "react-icons/gi";
import Link from "next/link";
import { Button, message } from "antd";
import Image from "next/image";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { removeComponent } from "@/redux/features/pc-builder/pcBuilderSlice";

const PcBuilderComponent = ({ category, component }) => {
   const dispatch = useDispatch();

   const [messageApi, contextHolder] = message.useMessage();
   const key = "updatable";
   const openMessage = () => {
      messageApi.open({
         key,
         type: "loading",
         content: "Removing...",
      });
      setTimeout(() => {
         messageApi.open({
            key,
            type: "success",
            content: "Removed!",
            duration: 2,
         });
      }, 1000);
   };
   const removeSelectedComponent = () => {
      openMessage();
      setTimeout(() => {
         dispatch(removeComponent(component.key));
      }, 1000);
   };

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
      <div className="component flex items-center justify-between gap-3 sm:gap-5 bg-white m-2 rounded-md shadow-md shadow-slate-100 hover:shadow-slate-200">
         <div className=" w-auto sm:w-32 p-2 sm:p-5 flex items-center justify-center">
            {!component.value?.length > 0 ? (
               icon
            ) : (
               <Image
                  src={component.value[0]?.image}
                  alt="thumbnail"
                  width={50}
                  height={50}
               ></Image>
            )}
         </div>
         {contextHolder}
         <div className=" flex-auto p-2 sm:p-5">
            <h2 className="text-slate-400">{category.name}</h2>
            <div className="flex justify-between items-start flex-col sm:flex-row gap-1 mt-1">
               <h2 className="text-md sm:text-lg">
                  {component.value?.length > 0 && component.value[0].name}
               </h2>
               <p className="text-md sm:text-lg">
                  {component.value?.length > 0 &&
                     `$${component.value[0].price}`}
               </p>
            </div>
         </div>
         <div className="w-auto sm:w-32 p-2 sm:p-5 flex items-center justify-center">
            {component.value?.length > 0 ? (
               <GrClose
                  className="text-xl"
                  onClick={removeSelectedComponent}
               ></GrClose>
            ) : (
               <Link href={`/category/${category.slug}`}>
                  <Button>Choose</Button>
               </Link>
            )}
         </div>
      </div>
   );
};

export default PcBuilderComponent;
