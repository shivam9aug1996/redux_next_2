import { MongoClient, ObjectId } from "mongodb";

let cachedClient;
let db;
const uri =
  "mongodb+srv://shivam9aug1996:7hifuJTjkpLN8bGS@cluster0.dyqv0ub.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = async () => {
  await connectCluster();
  let res = await connectDatabase();
  return res;
};

const connectCluster = async () => {
  if (cachedClient) {
    return cachedClient;
  }
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    cachedClient = client;
    return client;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const connectDatabase = async () => {
  if (db) {
    return db;
  } else {
    db = await cachedClient.db("basic-crud");
    return db;
  }
};
