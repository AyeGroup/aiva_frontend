"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
// import NProgress from "nprogress";

// NProgress.configure({
//   showSpinner: false,
//   speed: 400,
//   minimum: 0.1,
//   trickleSpeed: 200,
// });

export default function NProgressHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start progress bar when route changes
    // NProgress.start();

    // Complete progress bar after a short delay
    const timer = setTimeout(() => {
      // NProgress.done();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
