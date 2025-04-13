import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

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
            return existingConversation._id;
        }                                   
        
        // TODO: Upload image and generate URL
        let groupImage;
        if(args.groupImage){
            groupImage = args.groupImage;
        }

        const newConversation = await ctx.db.insert("conversations", {
            participants: args.participants,
            isGroup: args.isGroup,
            groupName: args.groupName,
            groupImage,
            admin: args.admin
        });
    }
})