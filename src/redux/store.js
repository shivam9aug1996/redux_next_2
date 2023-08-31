import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authSlice, { authApi } from "./features/Auth/authSlice";
import cartSlice, { cartApi } from "./features/Cart/cartSlice";
import categorySlice, { categoryApi } from "./features/Category/categorySlice";
import orderSlice, { orderApi } from "./features/Order/orderSlice";
import productSlice, { productApi } from "./features/Product/productSlice";
import userSlice, { userApi } from "./features/Users/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]:cartApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
    [categoryApi.reducerPath]:categoryApi.reducer,
    auth: authSlice,
    products: productSlice,
    cart:cartSlice,
    order:orderSlice,
    category:categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
      .concat(orderApi.middleware)
      .concat(categoryApi.middleware),
});

export default store;
setupListeners(store.dispatch);
