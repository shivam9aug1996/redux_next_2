import dynamic from "next/dynamic";



const Profile = dynamic(() => import("./Profile"), {
  ssr: false,
});



const Page = () => {
 return <Profile/>
};

export default Page;
