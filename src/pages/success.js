import React from "react";
import { Button, Result } from "antd";
import Link from "next/link";
import RootLayout from "@/components/layouts/RootLayout";
const SuccessBuild = () => (
   <Result
      status="success"
      title="Hurrah! You Successfully Built Your PC!"
      extra={[
         <Link href="/" key="home">
            <Button type="primary" danger>Back To Home</Button>
         </Link>,
         <Link href="/pc-builder" key="pc-builder">
            <Button>Build Again</Button>
         </Link>,
         ,
      ]}
   />
);
export default SuccessBuild;
SuccessBuild.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
 };
 
