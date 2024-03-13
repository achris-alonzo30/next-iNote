"use client";

import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { api } from "../../convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";

import { Clipboard, MessageSquare, Sparkles, Trash } from "lucide-react";

import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ChatInput } from "./chat-input";
import { Button } from "@/components/ui/button";




export function ChatPopover({ documentId }: { documentId: Id<"documents"> }) {
  const [copied, setCopied] = useState(false);

  const { user } = useUser();
  const username = user?.firstName
  const sessionId = `${documentId}|${username}`;

  const clear = useMutation(api.messages.clear)
  const messages = useQuery(api.messages.list, { sessionId });

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [messages])

  const onCopy = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast("Failed to copy message");
      console.error(error);
    } finally {
      toast("Successfully Copied to clipboard");
    }

  };

  const clearMessage = async (body: string, sessionId: string) => {
    try {
      await clear({ body, sessionId });
    } catch (error) {
      toast("Failed to clear message");
      console.error(error);
      
    } finally {
      toast("Successfully cleared message");
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-slate-800 no-underline group cursor-pointer overflow-hidden relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
            <div className="flex items-center text-sm">
              <span className="mr-2 border p-1 rounded-full dark:border-yellow-700 border-yellow-500">
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </span>
              <span className="underline inline-flex animate-background-shine bg-[linear-gradient(110deg,#dedede,45%,#1f1f1f,55%,#dedede)] bg-[length:250%_100%] bg-clip-text text-sm font-extrabold text-transparent">Write with AI</span>
            </div>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 h-full" align="end">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col items-center space-y-2">
            <h4 className="font-medium leading-none">iNoteAI</h4>
            <p className="flex items-center gap-x-2 text-sm text-muted-foreground">
              <span className="animate-pulse w-2 h-2 bg-[#43a855] rounded-full" />
              <span className="text-muted-foreground">Connected as</span><strong>{username}</strong>
            </p>
          </div>
          <div className="flex max-h-72 border-zinc-400 flex-1 flex-col gap-4 p-3 overflow-y-auto scrollbar-thumb scrollbar-thumb-rounded scrollbar-track scrollbar-w-2 scrolling-touch">
            {messages && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center space-y-2">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No messages yet</p>
              </div>
            )}
            {messages?.map((message) => (
              <article key={message._id} className={cn(message.author === username ? "self-end" : "self-start")}>
                <div className={cn(message.author === username ? "text-right justify-end text-sm" : "text-left justify-start text-sm")}>{message.author}</div>

                <div className="relative w-full h-full">
                  <span className="absolute inset-0 flex items-center bg-black/50 justify-center gap-x-4 z-10 opacity-0 hover:opacity-100">
                    <Clipboard className={cn("h-5 w-5 text-zinc-300 cursor-pointer", copied && "text-[#43a855]")} onClick={() => onCopy(message.body)} />
                    <Trash className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => clearMessage(message.body, sessionId)} />
                  </span>
                  
                  <p className={cn(message.author === username ? "bg-[#43a855] text-zinc-200 text-right justify-end rounded-xl rounded-tr-none p-2" : "bg-zinc-700 text-left text-zinc-200 justify-start rounded-xl rounded-tl-none p-2", message.author === "iNoteAI" && message.body === "Thinking..." && "animate-pulse text-muted-foreground bg-zinc-700 text-left text-zinc-200 justify-start rounded-xl rounded-tl-none p-2")}>
                    {message.body}
                  </p>
                </div>
                <span className={cn(message.author === username ? "flex justify-end mt-0.5 text-muted-foreground text-xs" : "flex justify-start mt-0.5 text-muted-foreground text-xs")}>{formatDistance(new Date(message._creationTime), new Date(), { addSuffix: true })}</span>
              </article>
            ))}
          </div>
          <ChatInput sessionId={sessionId} author={username} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
