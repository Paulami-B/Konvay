import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values';

export default defineSchema({
    users: defineTable({
        uid: v.string(),
        name: v.string(),
        email: v.string(),
        image: v.string(),
        isOnline: v.boolean()
    }).index("by_uid", ["uid"])
});