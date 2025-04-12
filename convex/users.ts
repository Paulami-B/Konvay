import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const setUserOnline = mutation({
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
});

export const getUsers = query({
    args: {},
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new ConvexError("Unauthorised access");
        }
        const users = await ctx.db.query("users").collect();
        return users.filter((user) => user.uid!=identity.tokenIdentifier);
    }
});

export const getMe = query({
    args: {},
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new ConvexError("Unauthorised access");
        }
        const user = await ctx.db
                    .query("users")
                    .withIndex("by_uid", (q) => q.eq("uid", identity.tokenIdentifier))
                    .unique();
        if(!user){
            throw new ConvexError("User not found");
        }                    
        return user;
    }
})