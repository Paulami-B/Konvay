import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const getMessages = query({
    args: {
        uid: v.string(),
        conversation: v.id("conversations")
    },
    handler: async(ctx, args) => {
        const currentUser = await ctx.db
                    .query("users")
                    .withIndex("by_uid", (q) => q.eq("uid", args.uid))
                    .unique();
        if(!currentUser){
            throw new ConvexError("Unauthorised access");
        }
        const messages = await ctx.db
                        .query("messages")
                        .withIndex("by_conversationId", (q) => q.eq("conversationId", args.conversation))
                        .collect();
        //TODO: Optimise it. Currently it runs once for each message in the conversation
        const messagesWithSender = await Promise.all(
                                        messages.map(async(message) => {
                                            const sender = await ctx.db.query("users")
                                                            .filter(q => q.eq(q.field("_id"), message.sender))
                                                            .first();
                                            return {...message, sender};
                                        })
                                    ); 
        return messagesWithSender;                       
    }
})