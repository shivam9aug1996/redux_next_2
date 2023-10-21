"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withMounted = (WrappedComponent) => {

  return (props) => {
   const [isMounted,setIsMounted] = useState(false)
    const router = useRouter();

    useEffect(() => {
      setIsMounted(true)
    }, []);
    
    
    if (isMounted) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withMounted;
