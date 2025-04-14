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
        const newUser = await ctx.db.insert("users", {
            uid: args.uid,
            email: args.email,
            name: args.name,
            image: args.image,
            isOnline: true
        });
        return newUser;
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
            return existing;
        }
        const newUser = await ctx.db.insert("users", {
            uid: args.uid,
            email: args.email,
            name: args.name,
            image: args.image,
            isOnline: true
        });
        return newUser;
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
        return user;
    }
});

export const setUserOffline = mutation({
    args: {
        uid: v.optional(v.string()),
        isOnline: v.boolean()
    }, 
    handler: async(ctx, args) => {
        if(!args.uid){
            throw new ConvexError("Unauthorised access");
        }
        const uid = args.uid
        const user = await ctx.db
                    .query("users")
                    .withIndex("by_uid", (q) => q.eq("uid", uid)) 
                    .first();
        if(!user){
            throw new ConvexError("User not found");
        }
        await ctx.db.patch(user._id, {isOnline: args.isOnline});
    }
});

export const getUsers = query({
    args: {
        uid: v.optional(v.string())
    },
    handler: async(ctx, args) => {
        if(!args.uid){
            throw new ConvexError("Unauthorised access");
        }
        const uid = args.uid
        const currentUser = await ctx.db
                    .query("users")
                    .withIndex("by_uid", (q) => q.eq("uid", uid))
                    .unique();
        if(!currentUser){
            throw new ConvexError("Unauthorised access");
        }            
        const users = await ctx.db.query("users").collect();
        return users.filter((user) => user.uid!=args.uid);
    }
});

export const getMe = query({
    args: {
        uid: v.optional(v.string())
    },
    handler: async(ctx, args) => {
        if(!args.uid){
            throw new ConvexError("Unauthorised access");
        }
        const uid = args.uid
        const user = await ctx.db
                    .query("users")
                    .withIndex("by_uid", (q) => q.eq("uid", uid))
                    .unique();
        if(!user){
            throw new ConvexError("User not found");
        }                  
        return user;
    }
});