import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values';

export default defineSchema({
    users: defineTable({
        uid: v.string(),
        name: v.string(),
        email: v.string(),
        image: v.string(),
        isOnline: v.boolean()
    }).index("by_uid", ["uid"]),

    conversations: defineTable({
        participants: v.array(v.id("users")),
        isGroup: v.boolean(),
        groupName: v.optional(v.string()),
        groupImage: v.optional(v.string()),
        admin: v.optional(v.id("users"))
    })
});