import { Avatar, Button, Dropdown, Menu, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import logo from "../../assets/images/ARLogics-logo.svg";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const DesktopNavbar = ({ categories }) => {
   const { data: session } = useSession({});
   const router = useRouter();

   const handleSignOut = async () => {
      await signOut();
      router.replace("/");
   };

   return (
      <div
         className="flex items-center justify-between m-auto"
         style={{ maxWidth: "1200px" }}
      >
         <div className="flex items-center">
            <Link href="/">
               <Image src={logo} alt="Logo" width={150} height={40} />
            </Link>
         </div>

         <ul className="bg-transparent font-medium" mode="horizontal">
            <Space size={[30]} wrap>
               <Dropdown
                  overlayClassName="pt-3"
                  overlay={
                     <Menu>
                        {categories.map(({ key, label }) => (
                           <Menu.Item key={key}>{label}</Menu.Item>
                        ))}
                     </Menu>
                  }
               >
                  <a
                     onClick={(e) => e.preventDefault()}
                     className="flex items-center gap-1"
                  >
                     Categories <HiOutlineChevronDown></HiOutlineChevronDown>
                  </a>
               </Dropdown>

               {session?.user ? (
                  <>
                     <Avatar size="large" src={session?.user?.image} />
                     <span className="-ml-5">{session?.user?.name}</span>
                     <button onClick={handleSignOut}>Logout</button>
                  </>
               ) : (
                  <Link href="/login">Login</Link>
               )}
            </Space>
         </ul>

         <Link href="/pc-builder">
            <Button size="large" type="primary" className="bg-[#ff4922]">
               PC Builder
            </Button>
         </Link>
      </div>
   );
};

export default DesktopNavbar;
