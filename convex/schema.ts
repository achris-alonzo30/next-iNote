import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    userId: v.string(),
    fName: v.string(),
    lName: v.string(),
    followerCount: v.number(),
  }),

  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
    isViewed: v.optional(v.boolean()),
    isLiked: v.optional(v.boolean()),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),

  followers: defineTable({
    userId: v.id("user"),
    followerId: v.id("user"),
  })
    .index("by_user", ["userId"])
    .index("by_user_follower", ["userId", "followerId"]),

  comments: defineTable({
    documentId: v.id("documents"),
    user: v.string(),
    body: v.string(),
  }).index("by_user", ["user"]),

  messages: defineTable({
    author: v.string(),
    body: v.string(),
    sessionId: v.optional(v.string()),
  }).index("by_session", ["sessionId"]),
});
