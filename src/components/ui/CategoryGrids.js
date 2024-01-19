import React from "react";
import SingleCategoryGrid from "./SingleCategoryGrid";

const CategoryGrids = ({ products }) => {
   const categories = [];

   products.map((product) => {
      if (!categories.some((category) => category.name === product.category)) {
         categories.push({
            name: product.category,
            slug: product.category_slug,
         });
      }
   });
   return (
      <div>
         <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-7">
            {categories.map((category, index) => {
               return (
                  <SingleCategoryGrid
                     key={index}
                     category={category}
                  ></SingleCategoryGrid>
               );
            })}
         </div>
      </div>
   );
};

export default CategoryGrids;
