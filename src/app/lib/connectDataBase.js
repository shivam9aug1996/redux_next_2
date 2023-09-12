import { MongoClient, ObjectId } from "mongodb";

let cachedClient;
let db;
const uri =
  "mongodb+srv://shivam9aug1996:7hifuJTjkpLN8bGS@cluster0.dyqv0ub.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    await connectCluster();
    let res = await connectDatabase();
    return res;
  } catch (error) {
    console.log(error)
    throw error; 
 
  }
 
};

const connectCluster = async () => {
  if (cachedClient) {
    console.log("cachedClient",cachedClient)
    return cachedClient;
  }
  console.log("765redfghjkuytrdcvbhjk")
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
    throw error; 
  }
};

const connectDatabase = async () => {
  try {
    if (db) {
      return db;
    } else {
      if(cachedClient?.db){
        db = await cachedClient.db("basic-crud");
        return db;
      }else{
        throw new Error("MongoDB client not connected.");
      }
    }   
  } catch (error) {
    console.log(error)
    throw error; 
  }
 
};
