import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "lucide-react";
import { GithubIcon } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col items-center justify-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F] border-t">
      <div className="md:ml-auto w-full flex flex-col items-center justify-center gap-x-2 text-muted-foreground">
        <div className="flex mt-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="https://linkedin.com/in/lonzochris" target="_blank">
              <LinkedinIcon className="w-6 h-6" />
            </Link>
          </Button>

          <Button variant="ghost" size="sm">
            <Link href="https://github.com/achris-alonzo30" target="_blank">
              <GithubIcon className="w-6 h-6" />
            </Link>
          </Button>
        </div>
        <p className="text-base mt-2">
          © {currentYear} Design by <strong className="underline inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-base font-extrabold text-transparent">Lonzo-Chris</strong>
        </p>
      </div>
    </div>
  );
};

export default Footer;
