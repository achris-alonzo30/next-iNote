"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Error = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image 
                src="/error.png"
                alt="error"
                width="300"
                height="300"
                className="dark:hidden"
            />
            <Image 
                src="/error-dark.png"
                alt="error"
                width="300"
                height="300"
                className="hidden dark:blocl"
            />
            <h2 className="text-4xl font-bold">
                Something went wrong!
            </h2>
            <Button asChild className="transform hover:-translate-y-1 transition duration-400">
                <Link href="/documents">
                    Go Back
                </Link>
            </Button>

        </div>
    );
}

export default Error;