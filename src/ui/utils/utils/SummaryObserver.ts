import {type SetStateAction, useEffect} from "react";

export function useSummaryObserver(setSummaryVisible: (value: SetStateAction<boolean>) => void) {
  // Summary 추적
  useEffect(() => {
    const anchor = document.querySelector("#summary");
    if (!anchor) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setSummaryVisible(!entry.isIntersecting);
        })
      },
      {
        rootMargin: "0px",
        threshold: [0]
      }
    );

    observer.observe(anchor);

    return () => {
      observer.unobserve(anchor);
    }
  }, []);
}