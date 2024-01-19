import React from "react";
import { Button, Result } from "antd";
import RootLayout from "@/components/layouts/RootLayout";
import Link from "next/link";
const NotFound = () => (
   <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link href="/"><Button type="primary" className="bg-[#ff4922]">Back Home</Button></Link>}
   />
);
export default NotFound;

NotFound.getLayout = function getLayout(page) {
   return <RootLayout>{page}</RootLayout>;
};
