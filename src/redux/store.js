import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authSlice, { authApi } from "./features/Auth/authSlice";
import cartSlice, { cartApi } from "./features/Cart/cartSlice";
import productSlice, { productApi } from "./features/Product/productSlice";
import userSlice, { userApi } from "./features/Users/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]:cartApi.reducer,
    auth: authSlice,
    products: productSlice,
    cart:cartSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware),
});

export default store;
setupListeners(store.dispatch);
