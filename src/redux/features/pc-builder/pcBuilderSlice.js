import { createSlice } from "@reduxjs/toolkit";
import { useRouter } from "next/router";

const initialState = {
   components: {
      processor: [],
      motherboard: [],
      monitor: [],
      ram: [],
      power_supply_unit: [],
      storage_device: [],
      others: [],
   },
   categories: [
      { name: "CPU/Processor", slug: "cpu-processor" },
      { name: "Motherboard", slug: "motherboard" },
      { name: "Monitor", slug: "monitor" },
      { name: "RAM", slug: "ram" },
      { name: "Power Supply Unit", slug: "power-supply-unit" },
      { name: "Storage Device", slug: "storage-device" },
      { name: "Others", slug: "others" },
   ],
};

export const pcBuilderSlice = createSlice({
   name: "pcBuilder",
   initialState,
   reducers: {
      addComponent: (state, action) => {
         const { product, category } = action.payload;
         state.components[category] = [];
         state.components[category].push(product);
      },
      removeComponent: (state, action) => {
         const key = action.payload;
         state.components[key] = [];
      },
      removeAllComponent: (state, action) => {
         const components = state.components;
         Object.keys(components).map((key) => (components[key] = []));
      },
   },
});

export const { addComponent, removeComponent, removeAllComponent } =
   pcBuilderSlice.actions;

export default pcBuilderSlice.reducer;
