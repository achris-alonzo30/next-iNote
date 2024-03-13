"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useConvexAuth } from "convex/react";
import { UseScrollTop } from "@/hooks/use-scroll-top";
import { SignInButton, UserButton } from "@clerk/clerk-react";

import Logo from "./logo";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/mode-toggle";


const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = UseScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      {isLoading ? (
      
      <div className="flex items-center gap-x-4">
          <Skeleton className="h-8 w-8 rounded-full dark:bg-zinc-600 bg-zinc-200" />
            <Skeleton className="h-8 w-24 rounded-lg dark:bg-zinc-600 bg-zinc-200" />
            
          </div>
      ) : (
        <Logo />
      )}
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && (
          <div className="flex items-center gap-x-4">
            <Skeleton className="h-8 w-24 rounded-lg dark:bg-zinc-600 bg-zinc-200" />
            <Skeleton className="h-8 w-8 rounded-full dark:bg-zinc-600 bg-zinc-200" />
            <Skeleton className="h-8 w-8 rounded-full dark:bg-zinc-600 bg-zinc-200" />
          </div>
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm" className="transform hover:-translate-y-1 transition duration-400">
                Get Started For Free
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild className="transform hover:-translate-y-1 transition duration-400 hover:text-slate-300">
              <Link href="/documents">
                Get Started
              </Link>
            </Button>
            <UserButton 
              afterSignOutUrl="/"
            />
             <ModeToggle />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
