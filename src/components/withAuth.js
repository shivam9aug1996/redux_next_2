"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {

  return (props) => {
    const reduxToken = useSelector((state) => state?.auth?.token);
    const router = useRouter();
    

    // Simulating authentication logic
    const isAuthenticated = reduxToken!==undefined&&reduxToken!==""?true:false;
    

    useEffect(() => {
      // Redirect to login page if not authenticated
      if (!isAuthenticated) {
        router.replace("/")
      }
    }, []);

    // Render the wrapped component if authenticated
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
