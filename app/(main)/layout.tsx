"use client";

import { redirect } from "next/navigation";
import { Loader } from "@/components/loader";
import { useConvexAuth } from "convex/react";
import Navigation from "./_components/navigation";
import SearchCommand from "@/components/search-command";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto dark:bg-[#1F1F1F]">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
