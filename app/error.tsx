"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
            <h2 className="text-xl font-medium">
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