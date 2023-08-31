"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const withAdminAuth = (WrappedComponent) => {

  return (props) => {
    const reduxToken = useSelector((state) => state?.auth?.token);
    const isAdmin = useSelector((state) => state?.auth?.userData?.isAdmin||false);
    const router = useRouter();
    

    // Simulating authentication logic
    const isAuthenticated = reduxToken!==undefined&&reduxToken!==""?true:false;
    

    useEffect(() => {
      // Redirect to login page if not authenticated
      if (!isAuthenticated) {
        router.replace("/")
      }
      if (isAuthenticated&&!isAdmin) {
        router.replace("/")
      }
    }, []);

    // Render the wrapped component if authenticated
    if (isAuthenticated&&isAdmin) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAdminAuth;
