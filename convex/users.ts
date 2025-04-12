import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
    args: {
        uid: v.string(),
        email: v.string(),
        name: v.string(),
        image: v.string()
    },
    handler: async(ctx, args) => {
        await ctx.db.insert("users", {
            uid: args.uid,
            email: args.email,
            name: args.name,
            image: args.image,
            isOnline: true
        });
    }
});

export const googleUser = mutation({
    args: {
        uid: v.string(),
        email: v.string(),
        name: v.string(),
        image: v.string()
    },
    handler: async(ctx, args) => {
        const existing = await ctx.db
            .query("users")
            .withIndex("by_uid", (q) => q.eq("uid", args.uid))
            .first();
        if(existing){
            return;
        }
        await ctx.db.insert("users", {
            uid: args.uid,
            email: args.email,
            name: args.name,
            image: args.image,
            isOnline: true
        });
    }
});

export const setUserOffline = mutation({
    args: {
        uid: v.string(),
        isOnline: v.boolean()
    }, 
    handler: async(ctx, args) => {
        const user = await ctx.db
        .query("users")
        .withIndex("by_uid", (q) => q.eq("uid", args.uid))
        .first();
        if(!user){
            throw new ConvexError("User not found");
        }
        await ctx.db.patch(user._id, {isOnline: args.isOnline});
    }
})