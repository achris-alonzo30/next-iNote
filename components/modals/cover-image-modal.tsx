"use client";

import React from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";

import { 
  Dialog, 
  DialogHeader,
  DialogContent, 
} from "@/components/ui/dialog";
import { SingleImageDropzone } from "@/components/single-image-dropzone";

const CoverImageModal = () => {
  const params = useParams();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.update);

  const [file, setFile] = React.useState<File>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url
        }
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url
      });

      onClose();
    }
  }


  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Iamge</h2>
        </DialogHeader>
        <SingleImageDropzone className="w-full outline-none" disabled={isSubmitting} onChange={onChange} value={file} />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
