"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const { getToken } = useAuth();
  useEffect(() => {
    const call = async () => {
      const token = await getToken();
      console.log({ token });
    };
    call();
  }, []);
  return <div></div>;
}
