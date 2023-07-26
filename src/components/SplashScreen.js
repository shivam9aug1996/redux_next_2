// components/SplashScreen.js
import { useEffect, useState } from 'react';
import styles from "./SplashScreen.module.css";

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
</div> : null;
};

export default SplashScreen;
