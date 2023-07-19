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

export const checkProductIsInCart = (cartData,productId) => {
  let data = cartData?.filter((item, index) => {
    return productId == item?.product._id;
  });
  if (data?.length > 0) return true;
  else return false;
};