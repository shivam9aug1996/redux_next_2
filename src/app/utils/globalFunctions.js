import jwt from "jsonwebtoken";
export async function verifyToken(token) {
  try {
    const decoded = await jwt.verify(token, "secretkey");
    console.log("hgre5678ihbn",decoded)
    return decoded?.id
  } catch (error) {
    throw new Error('Invalid token');
  }
}