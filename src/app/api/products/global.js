import { promises as fs } from "fs";
import { v2 as cloudinary } from "cloudinary";
import { writeFile } from "fs/promises";
import { ObjectId } from "mongodb";
import path from "path";



cloudinary.config({
  cloud_name: "dc2z2c3u8",
  api_key: "828193955168214",
  api_secret: "Ia_BQ8lpzOXbzzT71rLeJPB8z1U",
});


export const uploadImage=async(imageFile)=>{
  let imageUrl=null
  console.log("iuytfdfghj",imageFile)
  const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), 'uploads');
     // const uploadDir = `./${imageFile.name}`;
     
      try {
        await writeFile(uploadDir, buffer);
      } catch (error) {
        console.log(error);
      }
     
      try {
        const uploadResult = await cloudinary.uploader.upload(uploadDir, {
          public_id: `uploaded-images/${imageFile.name}`, // Adjust the public_id as needed
        });
        imageUrl = uploadResult?.secure_url;
        try {
          await fs.unlink(uploadDir);
          console.log('File deleted successfully');
          return imageUrl
        } catch (error) {
          console.log('Error deleting file:', error);
        }
      } catch (error) {
        console.log("u7trdfghjk", error);
      }
}


export const checkAdminStatus = async (userId, database) => {
  try {
    const collection = await database.collection("private_users");

    // Assuming your user document has an 'isAdmin' field
    const user = await collection.findOne({ _id: new ObjectId(userId) });
    console.log("jhgre56789", user);
    if (user && user.isAdmin) {
      return true; // User is an admin
    } else {
      return false; // User is not an admin
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false; // Error occurred, treat user as non-admin
  }
};