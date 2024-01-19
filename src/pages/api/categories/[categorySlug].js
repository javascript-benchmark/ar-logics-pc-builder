import { ObjectId } from "mongodb";
import { client } from "../products/index";

async function handler(req, res) {
   try {
      await client.connect();
      const productsCollection = client.db("ar-logics").collection("products");
      if (req.method === "GET") {
         const products = await productsCollection
            .find({ category_slug: req.query.categorySlug })
            .toArray();
         res.send({
            message: "Success",
            status: 200,
            data: products,
         });
      }
   } finally {
   }
}
export default handler;
