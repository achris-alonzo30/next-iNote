import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const Logo = () => {
  return (
    <div
      className={cn("hidden md:flex items-center gap-x-2", poppins.className)}
    >
      <Image src="/logo.svg" alt="logo" width={32} height={32} className="dark:hidden"/>
      <Image src="/logo-dark.svg" alt="logo" width={32} height={32} className="hidden dark:block"/>
      <p className={cn("font-semibold text-2xl", poppins.className)}>iTask</p>
    </div>
  );
};

export default Logo;
