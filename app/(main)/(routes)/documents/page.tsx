"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { formatDistance, subDays } from "date-fns";
import { useMutation, useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";

import { PlusCircle } from "lucide-react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const DocumentsPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { user } = useUser();
  const router = useRouter();

  const create = useMutation(api.documents.create);
  const documents = useQuery(api.documents.getDocuments);

  const onCreate = () => {
    const promise = create({
      title: "Untitled",
    }).then((documentId) => router.push(`/documents/${documentId}`));

    toast.promise(promise, {
      loading: "Creating document...",
      success: "Document Created!",
      error: "Failed to create document.",
    });
  };


  return (
    <>
      {documents && documents.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center space-y-4">

          <Image
            src="/write.svg"
            alt="Empty"
            width="300"
            height="300"
            className="dark:hidden"
          />
          <Image
            src="/dark-write.svg"
            alt="Empty"
            width="300"
            height="300"
            className="hidden dark:block"
          />
          <h2 className="text-lg font-medium">
            Welcome to {user?.firstName}&apos;s iNote
          </h2>
          <Button onClick={onCreate} className="transform hover:-translate-y-1 transition duration-400">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </div>
      ) : (
        <div className="flex flex-col sm:ml-60 mt-24 max-w-5xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">
              documents
              </h1>
              <Button onClick={onCreate} className="transform hover:-translate-y-1 transition duration-400">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Document
          </Button>
          </div>
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
            {documents?.map((doc, idx) => {
              return (
                <Link
                  href={`/documents/${doc._id}`}
                  key={doc._id}
                  className="relative group block p-2 h-full w-full "
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.span
                        className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block  rounded-3xl"
                        layoutId="hoverBackground" // required for the background to follow
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: { duration: 0.15 },
                        }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.15, delay: 0.2 },
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <div className=" rounded-2xl h-full w-full p-2 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-800/[0.2] border border-transparent group-hover:border-slate-700 relative z-50">
                    <div className="relative z-50">
                      <div className="p-4">
                        <div className=" text-zinc-100 font-semibold tracking-wide mt-2 truncate">
                          {doc.title}
                        </div>
                        <p className="mt-8 text-zinc-400 tracking-wide leading-relaxed text-xs truncate">
                        Created {formatDistance(new Date(doc._creationTime), new Date(), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default DocumentsPage;
