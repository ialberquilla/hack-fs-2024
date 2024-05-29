"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const SwitchTheme = () => {
  const { setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme("dark");
  }, []);

  if (!mounted) return null;

  return (
    <></>
  );
};
