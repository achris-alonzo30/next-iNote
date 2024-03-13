"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { MoreHorizontal, Trash } from "lucide-react";

import { toast } from "sonner";
import { 
  DropdownMenu, 
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent, 
  DropdownMenuSeparator,  
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
  documentId: Id<"documents">;
}

const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const {user} = useUser();

  const archive = useMutation(api.documents.archive)

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Archiving document...",
      success: "Document archived",
      error: "Failed to archive document",
    });

    router.push("/documents");
  }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
                <MoreHorizontal className="h-6 w-6"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" alignOffset={8} forceMount>
            <DropdownMenuItem onClick={onArchive}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="text-xs text-muted-foreground">
                Last edited by: {user?.fullName}
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton () {
    return (
        <Skeleton className="h-10 w-10 rounded-md" />
    )
}
export default Menu;
