"use server"
export const getProducts = async (page=1) => {
  let url = "";
  if (process.env.NODE_ENV == "development") {
    url = `http://localhost:3000/api/products?page=${page}`;
  } else {
    url = `${process.env.API_URL}api/products?page=${page}`;
  }
  let data = await fetch(url,{cache:"force-cache"});
  data = await data?.json();
  return data;
};