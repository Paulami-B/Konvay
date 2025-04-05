import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getProducts = mutation({
    args: {},
    handler: async(ctx, args) => {
        const products = await ctx.db.query("products").collect();
        return products;
    }
});

export const addProduct = mutation({
    args: {
        name: v.string(),
        price: v.number()
    },
    handler: async(ctx, args) => {
        const productID = await ctx.db.insert("products", {name: args.name, price: args.price});
        return productID;
    }
});

export const deleteProduct = mutation({
    args: {
        id: v.id('products')
    },
    handler: async(ctx, args) => {
        const productID = await ctx.db.delete(args.id)
    }
})