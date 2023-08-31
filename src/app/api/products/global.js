import { promises as fs } from "fs";
import { v2 as cloudinary } from "cloudinary";
import { writeFile } from "fs/promises";

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
      
      const path = `./public/uploads/${imageFile.name}`;
     
      try {
        await writeFile(path, buffer);
      } catch (error) {
        console.log(error);
      }
     
      try {
        const uploadResult = await cloudinary.uploader.upload(path, {
          public_id: `uploaded-images/${imageFile.name}`, // Adjust the public_id as needed
        });
        imageUrl = uploadResult?.secure_url;
        try {
          await fs.unlink(path);
          console.log('File deleted successfully');
          return imageUrl
        } catch (error) {
          console.log('Error deleting file:', error);
        }
      } catch (error) {
        console.log("u7trdfghjk", error);
      }
}