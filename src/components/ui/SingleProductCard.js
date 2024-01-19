import React from "react";
import { AiFillStar } from "react-icons/ai";
import {
   EditOutlined,
   EllipsisOutlined,
   SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, message } from "antd";
import Image from "next/image";
import cardImage from "../../assets/images/product.webp";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addComponent } from "@/redux/features/pc-builder/pcBuilderSlice";
import { useRouter } from "next/router";
const { Meta } = Card;

const SingleProductCard = ({ product }) => {
   const { _id, name, image, status, rating, price, category } = product;
   const dispatch = useDispatch();
   const router = useRouter();

   const [messageApi, contextHolder] = message.useMessage();
   const key = "updatable";
   const openMessage = () => {
      messageApi.open({
         key,
         type: "loading",
         content: "Adding...",
      });
      setTimeout(() => {
         messageApi.open({
            key,
            type: "success",
            content: "Added!",
            duration: 2,
         });
      }, 1000);
   };

   const addToPCBuilder = (product) => {
      let category = "";
      if (product.category_slug === "cpu-processor") {
         category = "processor";
      } else if (product.category_slug === "power-supply-unit") {
         category = "power_supply_unit";
      } else if (product.category_slug === "storage-device") {
         category = "storage_device";
      } else {
         category = product.category_slug;
      }
      dispatch(addComponent({ product, category }));
      openMessage();
      setTimeout(() => {
         router.push("/pc-builder");
      }, 1500);
   };
   return (
      <Card
         size="small"
         className="shadow-sm"
         responsive
         hoverable
         actions={[
            <Link key="details" href={`/product/${_id}`}>
               <Button>Details</Button>
            </Link>,

            <Button
               onClick={() => addToPCBuilder(product)}
               key="pc-builder"
               type="primary"
               danger
            >
               Add To Builder
            </Button>,
         ]}
      >
         {contextHolder}
         <Image
            alt="thumbnail"
            src={image}
            width={130}
            height={130}
            responsive
            className="m-auto"
         />
         <p className=" flex justify-center text-amber-500 mt-4">
            Rating: {rating}/5
         </p>
         <p className=" text-center text-slate-400">{category}</p>
         <h2 className=" text-md font-semibold py-2 text-center">{name}</h2>
         <div className="flex justify-center items-center gap-5">
            <span className="text-slate-400">{status}</span>
            <span>${price}</span>
         </div>
      </Card>
   );
};
export default SingleProductCard;
