import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createConversation = mutation({
    args: {
        uid: v.string(),
        participants: v.array(v.id("users")),
        isGroup: v.boolean(),
        groupName: v.optional(v.string()),
        groupImage: v.optional(v.id("_stroage")),
        admin: v.optional(v.id("users"))
    },
    handler: async(ctx, args) => {
        const currentUser = await ctx.db
                    .query("users")
                    .withIndex("by_uid", (q) => q.eq("uid", args.uid))
                    .unique();
        if(!currentUser){
            throw new ConvexError("Unauthorised access");
        }
        const existingConversation = await ctx.db
                                    .query("conversations")
                                    .filter((q) => 
                                        q.or(
                                            q.eq(q.field("participants"), args.participants),
                                            q.eq(q.field("participants"), args.participants.reverse())
                                        )
                                    ).first();
        if(existingConversation){
            return existingConversation;
        }                                   
        
        // TODO: Upload image and generate URL
        let groupImage;
        if(args.groupImage){
            groupImage = args.groupImage;
        }

        const conversationId = await ctx.db.insert("conversations", {
            participants: args.participants,
            isGroup: args.isGroup,
            groupName: args.groupName,
            groupImage,
            admin: args.admin
        });

        const newConversation = await ctx.db
                                .query("conversations")
                                .filter((q) => 
                                    q.eq(q.field("_id"), conversationId)
                                ).first();

        return newConversation;
    }
});

export const getMyConversations = query({
    args: {
        uid: v.string()
    },
    handler: async(ctx, args) => {
        const currentUser = await ctx.db
                    .query("users")
                    .withIndex("by_uid", (q) => q.eq("uid", args.uid))
                    .unique();
        if(!currentUser){
            throw new ConvexError("Unauthorised access");
        }
        const conversations = await ctx.db.query("conversations").collect();
        const myConversations = conversations.filter((conversation) => {
            return conversation.participants.includes(currentUser._id)
        });

        const conversationsWithDetails = await Promise.all(
            myConversations.map(async(conversation) => {
                //To get user details of the ither user in a 1-on-1 conversation
                let userDetails = {};
				if (!conversation.isGroup) {
					const otherUserId = conversation.participants.find((id) => id !== currentUser._id);
					const userProfile = await ctx.db
						.query("users")
						.filter((q) => q.eq(q.field("_id"), otherUserId))
						.take(1);

					userDetails = userProfile[0];
				}

                const lastMessage = await ctx.db
                                    .query("messages")
                                    .filter((q) => q.eq(q.field("conversationId"), conversation._id))
                                    .order("desc")
                                    .take(1);
                return{
					...userDetails,
                    ...conversation,
                    lastMessage: lastMessage[0] || null
                }                                    
            })
        );
        return conversationsWithDetails;
    },
});

export const kickUser = mutation({
	args: {
        uid: v.string(),
		conversationId: v.id("conversations"),
		userIds: v.array(v.id("users")),
	},
	handler: async (ctx, args) => {
		const currentUser = await ctx.db
                    .query("users")
                    .withIndex("by_uid", (q) => q.eq("uid", args.uid))
                    .unique();
        if(!currentUser){
            throw new ConvexError("Unauthorised access");
        }

		const conversation = await ctx.db
                            .query("conversations")
                            .filter((q) => q.eq(q.field("_id"), args.conversationId))
                            .unique();

		if (!conversation) throw new ConvexError("Conversation not found");

		await ctx.db.patch(args.conversationId, {
			participants: conversation.participants.filter((id) => 
                Array.isArray(args.userIds) ? !args.userIds.includes(id) : id !== args.userIds
            ),
		});
	},
});

export const generateUploadURL = mutation({
    args: {},
    handler(ctx, args) {
        return ctx.storage.generateUploadUrl();
    },
})