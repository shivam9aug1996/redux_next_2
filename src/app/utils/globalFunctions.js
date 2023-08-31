import jwt from "jsonwebtoken";


export async function verifyToken(token) {
  try {
    const decoded = await jwt.verify(token, "secretkey");
    console.log("hgre5678ihbn", decoded);
    return decoded?.id;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export const checkProductIsInCart = (cartData, productId) => {
  let data = cartData?.filter((item, index) => {
    return productId == item?.product?._id;
  });
  if (data?.length > 0) return true;
  else return false;
};

export const generateReCaptchaToken = async (action = null) => {
  try {
    await new Promise((resolve) => {
      grecaptcha.enterprise.ready(() => {
        resolve();
      });
    });

    const token = await grecaptcha.enterprise.execute(
      "6LduukknAAAAAM1WgxSHlazc6Hgi6aToa1SGr_kx",
      { action }
    );

    return token;
  } catch (error) {
    console.error("Error generating reCAPTCHA token:", error);
    return null;
  }
};


export const objectToFormData=(obj)=> {
  const formData = new FormData();
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      formData.append(key, value);
    }
  }
  
  return formData;
}

