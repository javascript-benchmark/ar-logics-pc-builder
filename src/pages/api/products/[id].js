import { ObjectId } from "mongodb";
import {client} from './index'


async function handler(req, res) {
   try {
      await client.connect();
      const productsCollection = client.db("ar-logics").collection("products");
      if (req.method === "GET") {
          const product = await productsCollection.findOne({ _id: new ObjectId(req.query.id) })
         res.send({
            message: "Success",
            status: 200,
            data: product,
         });
      }
   } finally {
   }
}
export default handler
