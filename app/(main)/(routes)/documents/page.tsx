"use client"

import Image from "next/image"
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


function DocumentPage() {
    const router = useRouter();
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
      const promise = create({ title: "Untitled" })
      .then((documentId) => router.push(`/documents/${documentId}`));


      toast.promise(promise, {
        loading: "Creating a new note...",
        success: "New note created",
        error: "Failed to create a new note."
      })
    };

    const formatFirstName = (firstName : any) => {
      return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
       <Image
       src="/empty.png"
       height="300"
       width="300"
       alt = "Empty"
       className="dark:hidden"
       />
       <Image
       src="/empty-dark.png"
       height="300"
       width="300"
       alt = "Empty"
       className="hidden dark:block"
       />
       <h2 className="text-lg font-medium">
        Welcome to {formatFirstName(user?.firstName)}&apos;s Motion
       </h2>
       <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
       </Button>
    </div>
  )
}

export default DocumentPage