"use client";

import { useEffect } from "react";

export default function GlobalToast2() {
  useEffect(() => {
    
    const hasVisitedSession = sessionStorage.getItem("hasVisitedSession2");
    if (!hasVisitedSession) {
      setTimeout(() => {
        sessionStorage.setItem("hasVisitedSession2", "true");
      }, 500);
    }

  }, []);

  return null;
}
