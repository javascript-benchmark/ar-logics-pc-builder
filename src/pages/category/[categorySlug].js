import RootLayout from "@/components/layouts/RootLayout";
import React from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider, Tag } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import SingleProductCard from "@/components/ui/SingleProductCard";

const CategoryArchive = ({ products }) => {
    const categoryName = products.map(product => product.category);
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
                  title: "Category",
               },
               {
                   title: categoryName[0],
               },
            ]}
           />
           <h2 className="p-10 text-center text-3xl">{categoryName[0]} Items</h2>
         <div className="mb-10">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
               {products.map((product) => {
                  return (
                     <SingleProductCard
                        key={product._id}
                        product={product}
                     ></SingleProductCard>
                  );
               })}
            </div>
         </div>
      </>
   );
};

export default CategoryArchive;

CategoryArchive.getLayout = function getLayout(page) {
   return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
   const res = await fetch(`${process.env.BASE_URL}/api/products`);
   const products = await res.json();
    let categories = [];
    
   products.data.map((product) => {
      if (!categories.some((category) => category.name === product.category)) {
         categories.push({
            name: product.category,
            slug: product.category_slug,
         });
      }
   });

   const paths = categories.map((category) => ({
      params: {
         categorySlug: category.slug,
      },
   }));

   return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
   const res = await fetch(
      `${process.env.BASE_URL}/api/categories/${params.categorySlug}`
   );
   const products = await res.json();

   return {
      props: {
         products: products?.data,
      },
   };
};
