// components/SplashScreen.js
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from "./SplashScreen.module.css";
 import cartPic from '../../public/cart.png'


const SplashScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hide the splash screen after 1 second
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return show ?  <div className={styles.splash}>
  <h1 className={styles.title}>Welcome to My Website</h1>
  <p className={styles.subtitle}>FastBuy</p>
  <Image src={cartPic} width={200} height={200} style={{opacity:0.8}} priority />
</div> : null;
};

export default SplashScreen;
