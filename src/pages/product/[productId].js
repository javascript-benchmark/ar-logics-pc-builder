import RootLayout from "@/components/layouts/RootLayout";
import React from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider, Tag } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const ProductDetails = ({ product }) => {
   const {
      _id,
      name,
      price,
      status,
      rating,
      category,
      description,
      image,
      individual_rating,
      average_rating,
      key_features,
      reviews,
   } = product;

   const keys = Object.keys(key_features);

   return (
      <>
         <Breadcrumb
            items={[
               {
                  title: (
                     <Link href="/">
                        <HomeOutlined className="flex items-center mt-1" />
                     </Link>
                  ),
               },
               {
                  title: "Products",
               },
               {
                  title: name,
               },
            ]}
         />
         <div className="columns-1 md:columns-2 mt-20 overflow-hidden">
            <div className="thumbnail mb-5">
               <Image
                  src={image}
                  alt="Product Image"
                  width={500}
                  height={200}
               ></Image>
            </div>
            <div className="product-info overflow-hidden">
               <h1 className="text-2xl">{name}</h1>
               <p>Category: {category}</p>
               <p className="grid gap-3 text-md my-3 grid-cols-2 mt-5">
                  <span className=" bg-blue-100 p-2 text-slate-500 rounded-md flex justify-center items-center gap-2">
                     Price:<span className="text-black"> ${price}</span>
                  </span>
                  <span className=" bg-blue-100 p-2 text-slate-500 rounded-md flex justify-center items-center gap-2">
                     Status:<span className="text-black"> {status}</span>
                  </span>
                  <span className=" bg-blue-100 p-2 text-slate-500 rounded-md flex justify-center items-center gap-2">
                     Individual Rating:<span className="text-black"> {individual_rating}/5</span>
                  </span>
                  <span className=" bg-blue-100 p-2 text-slate-500 rounded-md flex justify-center items-center gap-2">
                     Average Rating:
                     <span className="text-black"> {average_rating}/5</span>
                  </span>
               </p>
               <p className="description py-5">{description}</p>
               <Divider
                  orientation="left"
                  orientationMargin="0"
                  className=" mt-10"
               >
                  <h5 className="text-md">Key Features</h5>
               </Divider>
               <div className="pb-5">
                  {keys.map((key, index) => {
                     return (
                        <li
                           key={index}
                           className=" list-none flex items-center mb-1"
                        >
                           <span className=" capitalize font-medium">
                              {key}
                           </span>
                           : {key_features[key]}
                        </li>
                     );
                  })}
               </div>
               <Divider
                  orientation="left"
                  orientationMargin="0"
                  className=" mt-10"
               >
                  <h5 className="text-md">Reviews</h5>
               </Divider>
               <div>
                  {reviews.map((review,i) => {
                     return (
                        <div className="flex gap-4 mb-2" key={i}>
                           <div className="w-16 p-4 bg-orange-100 text-orange-500 flex justify-center items-center rounded-md">{review.rating}</div>
                           <div className=" bg-orange-100 text-black  flex-auto p-4 rounded-md">{review.comment}</div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </>
   );
};

export default ProductDetails;

ProductDetails.getLayout = function getLayout(page) {
   return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
   const res = await fetch(`${process.env.BASE_URL}/api/products`);
   const products = await res.json();

   const paths = products.data?.map((item) => ({
      params: {
         productId: item._id,
      },
   }));

   return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
   const { params } = context;

   const res = await fetch(
      `${process.env.BASE_URL}/api/products/${params.productId}`
   );
   const product = await res.json();

   return {
      props: {
         product: product?.data,
      },
   };
};
