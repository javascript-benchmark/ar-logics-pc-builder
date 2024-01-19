import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
import banner1 from "../../assets/images/banner-1.jpg";
import banner2 from "../../assets/images/banner-2.jpg";
import banner3 from "../../assets/images/banner-3.jpg";

const Slider = () => (
   <Carousel effect="fade" autoplay className="mb-10">
      <div>
         <Image
            src={banner1}
            width="1500"
            height="10"
            alt="First Slide"
         ></Image>
      </div>
      <div>
         <Image
            src={banner2}
            width="1500"
            height="10"
            alt="First Slide"
         ></Image>
      </div>
      <div>
         <Image
            src={banner3}
            width="1500"
            height="10"
            alt="First Slide"
         ></Image>
      </div>
   </Carousel>
);
export default Slider;
