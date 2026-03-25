import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import * as db from "../db";
import { TRPCError } from "@trpc/server";

export const blogRouter = router({
  // ============================================================================
  // Public Procedures (Read-only, no auth required)
  // ============================================================================

  /**
   * Get all published blog posts with optional filtering
   */
  getPublished: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        category: z
          .enum(["maintenance", "case-study", "emergency"])
          .optional(),
      })
    )
    .query(async ({ input }) => {
      if (input.category) {
        return db.getBlogPostsByCategory(input.category);
      }
      return db.getPublishedPosts(input.limit);
    }),

  /**
   * Get a single published blog post by slug
   */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await db.getBlogPostBySlug(input.slug);
      if (!post || post.status !== "published") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog post not found",
        });
      }
      return post;
    }),

  /**
   * Get related blog posts by category
   */
  getRelated: publicProcedure
    .input(z.object({ slug: z.string(), limit: z.number().default(3) }))
    .query(async ({ input }) => {
      return db.getRelatedBlogPosts(input.slug, input.limit);
    }),

  // ============================================================================
  // Protected Procedures (Admin only)
  // ============================================================================

  /**
   * Get all draft blog posts (admin only)
   */
  getDrafts: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Only admins can view drafts",
      });
    }
    return db.getDraftPosts();
  }),

  /**
   * Get all scheduled blog posts (admin only)
   */
  getScheduled: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Only admins can view scheduled posts",
      });
    }
    return db.getScheduledPosts();
  }),

  /**
   * Get a single blog post by ID (admin only)
   */
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can view post details",
        });
      }
      const post = await db.getBlogPostById(input.id);
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog post not found",
        });
      }
      return post;
    }),

  /**
   * Create a new blog post (admin only)
   */
  create: protectedProcedure
    .input(
      z.object({
        slug: z.string().min(1).max(255),
        title: z.string().min(1).max(255),
        excerpt: z.string().min(1).max(500),
        content: z.string().min(1),
        category: z.enum(["maintenance", "case-study", "emergency"]),
        featuredImage: z.string().url(),
        metaDescription: z.string().min(1).max(160),
        readTime: z.number().min(1).max(60),
        author: z.enum(["AI", "Human"]).default("AI"),
        status: z.enum(["draft", "scheduled", "published"]).default("draft"),
        publishDate: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can create posts",
        });
      }

      // Check if slug already exists
      const existing = await db.getBlogPostBySlug(input.slug);
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A post with this slug already exists",
        });
      }

      return db.createBlogPost({
        ...input,
        editedBy: ctx.user.id,
      });
    }),

  /**
   * Update a blog post (admin only)
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        slug: z.string().optional(),
        title: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        category: z.enum(["maintenance", "case-study", "emergency"]).optional(),
        featuredImage: z.string().url().optional(),
        metaDescription: z.string().optional(),
        readTime: z.number().optional(),
        status: z.enum(["draft", "scheduled", "published"]).optional(),
        publishDate: z.date().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can update posts",
        });
      }

      const { id, ...updateData } = input;

      // Verify post exists
      const post = await db.getBlogPostById(id);
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog post not found",
        });
      }

      // If slug is being changed, check for conflicts
      if (updateData.slug && updateData.slug !== post.slug) {
        const existing = await db.getBlogPostBySlug(updateData.slug);
        if (existing) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "A post with this slug already exists",
          });
        }
      }

      return db.updateBlogPost(id, {
        ...updateData,
        editedBy: ctx.user.id,
      });
    }),

  /**
   * Delete a blog post (admin only)
   */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can delete posts",
        });
      }

      const post = await db.getBlogPostById(input.id);
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog post not found",
        });
      }

      await db.deleteBlogPost(input.id);
      return { success: true };
    }),

  /**
   * Approve a draft post (transition to scheduled)
   */
  approveDraft: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        publishDate: z.date().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can approve posts",
        });
      }

      const post = await db.getBlogPostById(input.id);
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog post not found",
        });
      }

      if (post.status !== "draft") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only draft posts can be approved",
        });
      }

      // Default to 9 AM tomorrow if no publish date specified
      const publishDate = input.publishDate || new Date(Date.now() + 24 * 60 * 60 * 1000);
      publishDate.setHours(9, 0, 0, 0);

      return db.updateBlogPost(input.id, {
        status: "scheduled",
        publishDate,
        editedBy: ctx.user.id,
      });
    }),

  /**
   * Reject a draft post (keep as draft, log rejection)
   */
  rejectDraft: protectedProcedure
    .input(z.object({ id: z.number(), reason: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can reject posts",
        });
      }

      const post = await db.getBlogPostById(input.id);
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog post not found",
        });
      }

      if (post.status !== "draft") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only draft posts can be rejected",
        });
      }

      // Log rejection in edit history
      if (input.reason) {
        await db.createBlogPostEdit({
          postId: input.id,
          editedBy: ctx.user.id,
          changesSummary: `Rejected: ${input.reason}`,
        });
      }

      return { success: true, message: "Post rejected" };
    }),

  /**
   * Publish a scheduled post immediately
   */
  publishNow: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can publish posts",
        });
      }

      const post = await db.getBlogPostById(input.id);
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog post not found",
        });
      }

      if (post.status !== "scheduled") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only scheduled posts can be published immediately",
        });
      }

      return db.updateBlogPost(input.id, {
        status: "published",
        publishDate: new Date(),
        editedBy: ctx.user.id,
      });
    }),

  /**
   * Get edit history for a blog post
   */
  getEditHistory: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can view edit history",
        });
      }

      return db.getEditHistory(input.postId);
    }),

  /**
   * Increment view count for a published post
   */
  incrementViews: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const post = await db.getBlogPostById(input.id);
      if (!post || post.status !== "published") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog post not found",
        });
      }

      const newViews = (post.views || 0) + 1;
      return db.updateBlogPost(input.id, { views: newViews });
    }),
});
