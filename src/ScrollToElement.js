import { useState, useEffect } from "react";

export const ScrollToElement = ({ refrence = null }) => {
    const [scroll, setScroll] = useState(true);
    useEffect(() => {
      if (scroll && refrence) {
        window.scrollTo(
          0,
          refrence.current.offsetTop - refrence.current.offsetHeight
        );
        setScroll(false);
      }
    }, [refrence, scroll]);
  
    return null;
  };