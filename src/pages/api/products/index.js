import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
   "mongodb+srv://dch-user:14201001@cluster0.0tgfo.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   },
});

async function run(req, res) {
   try {
      await client.connect();
      const productsCollection = client.db("ar-logics").collection("products");
      if (req.method === "GET") {
         const products = await productsCollection.find({}).toArray();
         res.send({
            message: "Success",
            status: 200,
            data: products,
         });
      }
   } finally {
   }
}
export default run;
