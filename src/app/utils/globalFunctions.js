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

export const objectToFormData = (obj) => {
  const formData = new FormData();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      formData.append(key, value);
    }
  }

  return formData;
};

export function handleError(errCode) {
  switch (errCode) {
    case fioErrCode.PERMISSION_REFUSED:
      return "Access to the Camera stream was denied by the end user";
    case fioErrCode.NO_FACES_DETECTED:
      return "No faces were detected during the enroll or authentication process";
    case fioErrCode.UNRECOGNIZED_FACE:
      return "Unrecognized face on this application's Facial Index";
    case fioErrCode.MANY_FACES:
      return "Two or more faces were detected during the scan process";
    case fioErrCode.FACE_DUPLICATION:
      return "User enrolled previously (facial features already recorded). Cannot enroll again!";
    case fioErrCode.MINORS_NOT_ALLOWED:
      return "Minors are not allowed to enroll on this application!";
    case fioErrCode.PAD_ATTACK:
      return "Presentation (Spoof) Attack (PAD) detected during the scan process";
    case fioErrCode.FACE_MISMATCH:
      return "Calculated Facial Vectors of the user being enrolled do not match";
    case fioErrCode.WRONG_PIN_CODE:
      return "Wrong PIN code supplied by the user being authenticated";
    case fioErrCode.PROCESSING_ERR:
      return "Server-side error";
    case fioErrCode.UNAUTHORIZED:
      return "Your application is not allowed to perform the requested operation (e.g., Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information";
    case fioErrCode.TERMS_NOT_ACCEPTED:
      return "Terms & Conditions set out by FACEIO/host application rejected by the end user";
    case fioErrCode.UI_NOT_READY:
      return "The FACEIO Widget could not be (or is being) injected onto the client DOM";
    case fioErrCode.SESSION_EXPIRED:
      return "Client session expired. The first promise was already fulfilled but the host application failed to act accordingly";
    case fioErrCode.TIMEOUT:
      return "Ongoing operation timed out (e.g., Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)";
    case fioErrCode.TOO_MANY_REQUESTS:
      return "Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications";
    case fioErrCode.EMPTY_ORIGIN:
      return "Origin or Referer HTTP request header is empty or missing";
    case fioErrCode.FORBIDDEN_ORIGIN:
      return "Domain origin is forbidden from instantiating fio.js";
    case fioErrCode.FORBIDDEN_COUNTRY:
      return "Country ISO-3166-1 Code is forbidden from instantiating fio.js";
    case fioErrCode.SESSION_IN_PROGRESS:
      return "Another authentication or enrollment session is in progress";
    case fioErrCode.NETWORK_IO:
    default:
      return "Error while establishing a network connection with the target FACEIO processing node";
  }
}
