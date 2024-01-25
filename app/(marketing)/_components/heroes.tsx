import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className=" lg:block hidden relative w-[600px] h-[600px] sm:w-[500px] sm:h-[500px] md:h-[550px] md:w-[550px]">
          <Image
            src="/documents.png"
            fill
            className="object-contain dark:hidden"
            alt="Documents"
          />
          <Image
            src="/documents-dark.png"
            fill
            className="object-contain hidden dark:block"
            alt="Documents"
          />
        </div>
      </div>
    </div>
  )
}