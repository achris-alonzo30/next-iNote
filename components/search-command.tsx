"use client";


import React from "react";
import { useQuery } from "convex/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";

import { File } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const SearchCommand = () => {
  const router = useRouter();
  const { user } = useUser();
  const documents = useQuery(api.documents.getSearch);
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  if (!isMounted) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search {${user?.fullName}'s documents}...`} />
      <CommandList>
        <CommandEmpty>No Results Found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}`}
              title={document.title}
              onSelect={onSelect}
            >
              {document.icon ? (
                <div className="flex items-center gap-x-2">
                <p className="mr-2 text-[18px]">{document.icon}</p>
                <p className="mr-2 text-base">{document.title}</p>
                </div>
              ) : (
                <div className="flex items-center gap-x-2">
                <File className="mr-2 h-4 w-4" />
                <p className="mr-2 text-base">{document.title}</p>
                </div>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
