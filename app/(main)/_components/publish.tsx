"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { CheckIcon, Copy, Globe } from "lucide-react";

interface PublishProps {
  initialData: Doc<"documents">;
}

const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Document published!",
      error: "Failed to publish document.",
    });

    setTimeout(() => router.push(url), 2000);
  };

  const onUnPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Document unpublished!",
      error: "Failed to unpublish document.",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="sm" variant="ghost" className=" transform hover:-translate-y-1 transition duration-400">
          Publish
          {initialData.isPublished && (
            // Add spinning framer motion and shadow animation
            <Globe className="ml-2 h-4 w-4 text-muted-foreground animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4 ">
            <div className="flex items-center gap-x-2">
              <Globe className="animate-pulse h-4 w-4 text-muted-foreground" />
              <p className="text-xs font-medium">
                This document is now visible on public.
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this document</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others.
            </span>
            <Button
              className="w-full text-xs"
              size="sm"
              onClick={onPublish}
              disabled={isSubmitting}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
