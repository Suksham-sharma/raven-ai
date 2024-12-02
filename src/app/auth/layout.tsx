import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const user = await currentUser();
  if (user) redirect("/");
  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[500px] flex flex-col items-start p-6 bg-white">
        <Image
          src="/images/logo.png"
          alt="logo"
          sizes="100vw"
          width={150}
          height={60}
        />
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full overflow-hidden relative bg-cream flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Hi there! I&apos;m your AI powered assistant 🔥.
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          Now generating leads is much easier with our AI powered assistant.
          <br />
          We don&apos;t make your customers / users fill out long forms...
          <Image
            src="/images/app-ui.png"
            alt="app image"
            loading="lazy"
            sizes="30"
            className="absolute shrink-0 !w-[1600px] top-48"
            width={0}
            height={0}
          />
        </p>
      </div>
    </div>
  );
};

export default Layout;
