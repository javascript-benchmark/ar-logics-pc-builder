import React from "react";
import SingleProductCard from "./SingleProductCard";

const ProductCards = ({ allProducts }) => {
   return (
      <div className="mb-10">
         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allProducts.map((product) => {
               if (product.featured) {
                  return (
                     <SingleProductCard
                        key={product._id}
                        product={product}
                     ></SingleProductCard>
                  );
               }
            })}
         </div>
      </div>
   );
};

export default ProductCards;
