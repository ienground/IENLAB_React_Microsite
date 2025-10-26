import {type SetStateAction, useEffect} from "react";
import {useScrollMonitor} from "./ScrollData.ts";

export function useScrollObserver(setBoolean: (value: SetStateAction<boolean>) => void) {
  const toolbarThreshold = 100;
  const { scrollY, scrollDirection } = useScrollMonitor();

  useEffect(() => {
    setBoolean(scrollDirection === "up" || scrollY < toolbarThreshold);
  }, [scrollY, scrollDirection, setBoolean]);
}