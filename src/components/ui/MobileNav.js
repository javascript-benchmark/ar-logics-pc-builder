import React, { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import { RiMenu3Fill } from "react-icons/ri";
import Image from "next/image";
import logo from "../../assets/images/ARLogics-logo.svg";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const MobileNav = ({ categories }) => {
   const [open, setOpen] = useState(false);
   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);
   };
   return (
      <div className="flex items-center justify-between">
         <div className="flex items-center">
            <Link href="/">
               <Image src={logo} alt="Logo" width={130} />
            </Link>
         </div>

         <div className="flex gap-3 justify-end items-center">
            <Link href="/pc-builder">
               <Button size="medium" type="primary" className="bg-[#ff4922]">
                  PC Builder
               </Button>
            </Link>
            <div>
               <RiMenu3Fill
                  onClick={showDrawer}
                  className="text-2xl"
               ></RiMenu3Fill>
               <Drawer
                  width="320"
                  title="Categories"
                  closeIcon={<BsArrowLeft className="text-2xl text-black" />}
                  placement="right"
                  onClose={onClose}
                  open={open}
               >
                  <Menu>
                        {categories.map(({ key, label }) => (
                           <Menu.Item key={key}>{label}</Menu.Item>
                        ))}
                     </Menu>
               </Drawer>
            </div>
         </div>
      </div>
   );
};
export default MobileNav;
