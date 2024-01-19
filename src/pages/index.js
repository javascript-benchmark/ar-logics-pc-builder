import RootLayout from "@/components/layouts/RootLayout";
import CategoryGrids from "@/components/ui/CategoryGrids";
import ProductCards from "@/components/ui/ProductCards";
import Slider from "@/components/ui/Slider";
import { Divider } from "antd";
import React from "react";

const Homepage = ({ allProducts }) => {
   return (
      <div>
         <Slider></Slider>
         <Divider orientation="left" orientationMargin="0" className=" mt-10">
            <h2 className="text-2xl">Featured Products</h2>
         </Divider>
         <ProductCards allProducts={allProducts}></ProductCards>
         <Divider orientation="left" orientationMargin="0" className=" mt-10">
            <h2 className="text-2xl">Featured Categories</h2>
         </Divider>
         <CategoryGrids products={allProducts}></CategoryGrids>
      </div>
   );
};

export default Homepage;

Homepage.getLayout = function getLayout(page) {
   return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {

   const response = await fetch(`${process.env.BASE_URL}/api/products`);
   const data = await response.json();

   return {
      props: {
         allProducts: data?.data,
      },
   };
};
