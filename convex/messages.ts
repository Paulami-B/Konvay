import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const sendMessage = mutation({
    args: {
        uid: v.string(),
        content: v.string(),
        conversationId: v.id("conversations")
    },
    handler: async(ctx, args) => {
        const currentUser = await ctx.db
                    .query("users")
                    .withIndex("by_uid", (q) => q.eq("uid", args.uid))
                    .unique();
        if(!currentUser){
            throw new ConvexError("Unauthorised access");
        }
        const conversation = await ctx.db.query("conversations")
                            .filter((q) => q.eq(q.field("_id"), args.conversationId))
                            .unique();
        if(!conversation){
            throw new ConvexError("Conversation does not exist");
        }
        if(!conversation.participants.includes(currentUser._id)){
            throw new ConvexError("You are not part of this conversation");
        }
        
        await ctx.db.insert("messages", {
            sender: currentUser._id,
            content: args.content,
            conversationId: args.conversationId,
            messageType: "text"
        })
    }
})

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
});

export const sendImage = mutation({
	args: { 
        uid: v.string(),
        imageId: v.id("_storage"), 
        conversation: v.id("conversations") 
    },
	handler: async (ctx, args) => {
        const currentUser = await ctx.db
                            .query("users")
                            .withIndex("by_uid", (q) => q.eq("uid", args.uid))
                            .unique();
        if(!currentUser){
            throw new ConvexError("Unauthorised access");
        }

		const content = (await ctx.storage.getUrl(args.imageId)) as string;

		await ctx.db.insert("messages", {
			content: content,
			sender: currentUser._id,
			messageType: "image",
			conversationId: args.conversation,
		});
	},
});

export const sendVideo = mutation({
	args: { 
        uid: v.string(),
        videoId: v.id("_storage"), 
        conversation: v.id("conversations") 
    },
	handler: async (ctx, args) => {
        const currentUser = await ctx.db
                            .query("users")
                            .withIndex("by_uid", (q) => q.eq("uid", args.uid))
                            .unique();
        if(!currentUser){
            throw new ConvexError("Unauthorised access");
        }

		const content = (await ctx.storage.getUrl(args.videoId)) as string;

		await ctx.db.insert("messages", {
			content: content,
			sender: currentUser._id,
			messageType: "video",
			conversationId: args.conversation,
		});
	},
});