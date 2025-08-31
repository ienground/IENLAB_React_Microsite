import {useEffect, useState} from "react";

export const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};

export function useDarkmode() {
  const [isDarkmode, setDarkmode] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkmode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDarkmode;
}