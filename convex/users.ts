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
        return {
            uid: args.uid,
            email: args.email,
            name: args.name,
            image: args.image,
            isOnline: true
        };
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
        await ctx.db.insert("users", {
            uid: args.uid,
            email: args.email,
            name: args.name,
            image: args.image,
            isOnline: true
        });
        return {
            uid: args.uid,
            email: args.email,
            name: args.name,
            image: args.image,
            isOnline: true
        };
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
        return{
            uid: user.uid,
            email: user.email,
            name: user.name,
            image: user.image,
            isOnline: user.isOnline
        };
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
        const users = await ctx.db.query("users").collect();
        return users.filter((user) => user.uid!=args.uid);
    }
});

export const getMe = query({
    args: {
        uid: v.string()
    },
    handler: async(ctx, args) => {
        const user = await ctx.db
                    .query("users")
                    .withIndex("by_uid", (q) => q.eq("uid", args.uid))
                    .unique();
        if(!user){
            throw new ConvexError("User not found");
        }                  
        return user;
    }
});