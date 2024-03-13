"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";


import { Send } from "lucide-react";

import {
    Form,
    FormItem,
    FormField,
    FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


const chatInputSchema = z.object({
    message: z.string().min(2, { message: "Please enter a message" }),
});

type ChatInputProps = {
    author: string | null | undefined;
    sessionId: string
}


export const ChatInput = ({ sessionId, author }: ChatInputProps ) => {
    const sendMessage = useMutation(api.messages.send);

    const form = useForm<z.infer<typeof chatInputSchema>>({
        resolver: zodResolver(chatInputSchema),
        defaultValues: {
            message: ""
        }
    });

    const isSubmitting = form.formState.isSubmitting;

    const handleSubmit = async (data: z.infer<typeof chatInputSchema>) => {
        try {
            await sendMessage({ body: data.message, author: author ?? "", sessionId});
        } catch (error) {
            console.error(error);
            form.reset();
        } finally {
            form.reset();
        }
    }

    return (
        <>
        <Form {...form}>
                <form className="w-full h-[72px] shadow-lg rounded-lg flex">
                    <div className="relative flex flex-col w-full flex-grow p-4">
                        <div className="relative">
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                rows={1}
                                                maxRows={4}
                                                autoFocus
                                                placeholder="Need any help?"
                                                disabled={isSubmitting}
                                                className="resize-none pr-12 text-base py-3 scrollbar-thumb-zinc-400 scrollbar-thumb-rouned scrollbar-track-zinc-400-light scrollbar-w-2 scrollbar-track-rounded scrolling-touch"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                        e.preventDefault();
                                                        form.handleSubmit(handleSubmit)();
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button 
                                size="sm"
                                type="submit"
                                aria-label="Send message" 
                                disabled={isSubmitting}
                                className="absolute bottom-1.5 right-[8px]"
                                onClick={(e) => {
                                    e.preventDefault();
                                    form.handleSubmit(handleSubmit)();
                                }}  >
                                    <Send className="w-4 h-4" />
                                </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}