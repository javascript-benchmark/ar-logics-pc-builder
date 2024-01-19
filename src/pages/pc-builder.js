import RootLayout from "@/components/layouts/RootLayout";
import PcBuilderComponent from "@/components/ui/PcBuilderComponent";
import { removeAllComponent } from "@/redux/features/pc-builder/pcBuilderSlice";
import { Button, Divider } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const PCBuilder = () => {
   const components = useSelector((state) => state.pcBuilder.components);
   const categories = useSelector((state) => state.pcBuilder.categories);
   const router = useRouter();
   const dispatch = useDispatch();
   const [loadings, setLoadings] = useState([]);

   const isAnyKeyIsEmpty = () => {
      for (const key in components) {
         const value = components[key];
         if (value.length === 0) {
            return true;
         }
      }
      return false;
   };

   const enterLoading = (index) => {
      setLoadings((prevLoadings) => {
         const newLoadings = [...prevLoadings];
         newLoadings[index] = true;
         return newLoadings;
      });
      setTimeout(() => {
         setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            return newLoadings;
         });
      }, 6000);
   };

   // Function to calculate total pricing
   const calculateTotalPricing = () => {
      let total = 0;
      for (const key in components) {
         const componentArray = components[key];
         if (Array.isArray(componentArray)) {
            total += componentArray.reduce((accumulator, currentObject) => {
               return accumulator + (parseFloat(currentObject.price) || 0);
            }, 0);
         }
      }
      return total;
   };

   const totalPricing = calculateTotalPricing();

   const completeBuild = () => {
      enterLoading(1);
      setTimeout(() => {
         router.push("/success");
         dispatch(removeAllComponent());
      }, 1000);
   };

   const disableCompleteBuildButton = isAnyKeyIsEmpty();
   return (
      <div>
         <h2 className="p-10 text-center text-3xl">Build Your Own PC</h2>
         <div className=" max-w-5xl m-auto bg-slate-50 p-2 sm:p-16">
            <div>
               {categories.map((category) => {
                  let component = "";
                  if (category.slug === "cpu-processor") {
                     component = {
                        key: "processor",
                        value: components.processor,
                     };
                  } else if (category.slug === "motherboard") {
                     component = {
                        key: "motherboard",
                        value: components.motherboard,
                     };
                  } else if (category.slug === "monitor") {
                     component = { key: "monitor", value: components.monitor };
                  } else if (category.slug === "ram") {
                     component = { key: "ram", value: components.ram };
                  } else if (category.slug === "power-supply-unit") {
                     component = {
                        key: "power_supply_unit",
                        value: components.power_supply_unit,
                     };
                  } else if (category.slug === "storage-device") {
                     component = {
                        key: "storage_device",
                        value: components.storage_device,
                     };
                  } else if (category.slug === "others") {
                     component = { key: "others", value: components.others };
                  }
                  return (
                     <PcBuilderComponent
                        key={category.slug}
                        category={category}
                        component={component}
                     ></PcBuilderComponent>
                  );
               })}
            </div>
            <div className="flex justify-end gap-3 mt-10">
               <Button
                  className="flex items-center justify-between p-16"
                  type="dashed"
                  shape="round"
                  size="large"
               >
                  Total: ${totalPricing}
               </Button>
               <Button
                  className="flex items-center justify-between p-16"
                  type="primary"
                  shape="round"
                  icon={<FaPlus />}
                  loading={loadings[1]}
                  size="large"
                  danger
                  disabled={disableCompleteBuildButton}
                  onClick={completeBuild}
               >
                  Complete Build
               </Button>
            </div>
         </div>
      </div>
   );
};

export default PCBuilder;
PCBuilder.getLayout = function getLayout(page) {
   return <RootLayout>{page}</RootLayout>;
};
