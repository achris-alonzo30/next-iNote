"use client";

import React from "react";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";

import { ArrowRight } from "lucide-react";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/animated-ui/typewriter-effect";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const words = [
    {
      text: "Crafting",
    },
    {
      text: "Tomorrow",
    },
    {
      text: "Success",
    },
    {
      text: "with",
    },
    {
      text: "iNote.",
    },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold space-y-2">
        <TypewriterEffect words={words} />
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Simplify your life and stay organized
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild className="transform hover:-translate-y-1 transition duration-400">
          <Link href="/documents">
            Write Note
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal" >
          <Button size="sm" className="transform hover:-translate-y-1 transition duration-400">
            Explore Here
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
