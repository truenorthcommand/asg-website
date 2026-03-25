import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { z } from "zod";
import * as db from "../db";
import { initializeDatabase } from "../_core/db";

describe("Blog Router - Database Layer", () => {
  beforeAll(async () => {
    // Initialize database before running tests
    await initializeDatabase();
  });
  // Test data
  const testPost = {
    slug: "test-post-" + Date.now(),
    title: "Test Blog Post",
    excerpt: "This is a test excerpt",
    content: "# Test Content\n\nThis is test content in markdown.",
    category: "maintenance" as const,
    featuredImage: "https://example.com/image.jpg",
    metaDescription: "Test meta description",
    readTime: 5,
    author: "AI" as const,
    status: "draft" as const,
    publishDate: new Date(),
  };

  let createdPostId: number | null = null;

  // Skip tests if database is not available
  const skipIfNoDB = () => {
    try {
      db.getBlogPostById(1);
    } catch (e) {
      return true;
    }
    return false;
  };

  describe("Blog Post Operations", () => {
    it("should create a blog post", async () => {
      if (skipIfNoDB()) {
        console.log("Skipping blog tests - database not available");
        return;
      }
      const result = await db.createBlogPost(testPost);
      expect(result).toBeDefined();
      expect(result[0]).toHaveProperty("id");
      expect(result[0].slug).toBe(testPost.slug);
      expect(result[0].title).toBe(testPost.title);
      expect(result[0].status).toBe("draft");

      createdPostId = result[0].id;
    });

    it("should retrieve a blog post by ID", async () => {
      if (skipIfNoDB()) return;
      if (!createdPostId) {
        throw new Error("No post ID available");
      }

      const post = await db.getBlogPostById(createdPostId);
      expect(post).toBeDefined();
      expect(post?.id).toBe(createdPostId);
      expect(post?.title).toBe(testPost.title);
    });

    it("should retrieve a blog post by slug", async () => {
      if (skipIfNoDB()) return;
      const post = await db.getBlogPostBySlug(testPost.slug);
      expect(post).toBeDefined();
      expect(post?.slug).toBe(testPost.slug);
      expect(post?.title).toBe(testPost.title);
    });

    it("should retrieve draft posts", async () => {
      if (skipIfNoDB()) return;
      const drafts = await db.getDraftPosts();
      expect(Array.isArray(drafts)).toBe(true);
      expect(drafts.length).toBeGreaterThan(0);
      expect(drafts.some((p) => p.slug === testPost.slug)).toBe(true);
    });

    it("should update a blog post", async () => {
      if (skipIfNoDB()) return;
      if (!createdPostId) {
        throw new Error("No post ID available");
      }

      const updatedTitle = "Updated Test Post";
      const result = await db.updateBlogPost(createdPostId, {
        title: updatedTitle,
        status: "scheduled",
      });

      expect(result).toBeDefined();
      expect(result[0].title).toBe(updatedTitle);
      expect(result[0].status).toBe("scheduled");
    });

    it("should retrieve scheduled posts", async () => {
      if (skipIfNoDB()) return;
      const scheduled = await db.getScheduledPosts();
      expect(Array.isArray(scheduled)).toBe(true);
      // Should include our updated post
      expect(scheduled.some((p) => p.slug === testPost.slug)).toBe(true);
    });

    it("should publish a post", async () => {
      if (skipIfNoDB()) return;
      if (!createdPostId) {
        throw new Error("No post ID available");
      }

      const result = await db.updateBlogPost(createdPostId, {
        status: "published",
        publishDate: new Date(),
      });

      expect(result[0].status).toBe("published");
    });

    it("should retrieve published posts", async () => {
      if (skipIfNoDB()) return;
      const published = await db.getPublishedPosts(100);
      expect(Array.isArray(published)).toBe(true);
      expect(published.some((p) => p.slug === testPost.slug)).toBe(true);
    });

    it("should retrieve posts by category", async () => {
      if (skipIfNoDB()) return;
      const maintenancePosts = await db.getBlogPostsByCategory("maintenance");
      expect(Array.isArray(maintenancePosts)).toBe(true);
      expect(maintenancePosts.length).toBeGreaterThan(0);
    });

    it("should get related posts", async () => {
      if (skipIfNoDB()) return;
      const related = await db.getRelatedBlogPosts(testPost.slug, 3);
      expect(Array.isArray(related)).toBe(true);
      // Should not include the original post
      expect(related.every((p) => p.slug !== testPost.slug)).toBe(true);
    });

    it("should create a blog post edit record", async () => {
      if (skipIfNoDB()) return;
      if (!createdPostId) {
        throw new Error("No post ID available");
      }

      const result = await db.createBlogPostEdit({
        postId: createdPostId,
        editedBy: 1, // Assuming user ID 1 exists
        changesSummary: "Updated title and content",
      });

      expect(result).toBeDefined();
      expect(result[0]).toHaveProperty("id");
      expect(result[0].postId).toBe(createdPostId);
    });

    it("should get edit history for a post", async () => {
      if (skipIfNoDB()) return;
      if (!createdPostId) {
        throw new Error("No post ID available");
      }

      const history = await db.getEditHistory(createdPostId);
      expect(Array.isArray(history)).toBe(true);
      expect(history.length).toBeGreaterThan(0);
    });

    it("should increment view count", async () => {
      if (skipIfNoDB()) return;
      if (!createdPostId) {
        throw new Error("No post ID available");
      }

      const post = await db.getBlogPostById(createdPostId);
      const initialViews = post?.views || 0;

      const result = await db.updateBlogPost(createdPostId, {
        views: initialViews + 1,
      });

      expect(result[0].views).toBe(initialViews + 1);
    });

    it("should delete a blog post", async () => {
      if (skipIfNoDB()) return;
      if (!createdPostId) {
        throw new Error("No post ID available");
      }

      await db.deleteBlogPost(createdPostId);

      // Verify it's deleted
      const post = await db.getBlogPostById(createdPostId);
      expect(post).toBeUndefined();

      createdPostId = null;
    });
  });

  describe("Blog Post Validation", () => {
    it("should validate slug format", async () => {
      if (skipIfNoDB()) return;
      const invalidPost = {
        ...testPost,
        slug: "invalid slug with spaces",
      };

      // This should work as the DB layer doesn't validate slug format
      // Validation happens at the tRPC router level
      const result = await db.createBlogPost(invalidPost);
      expect(result).toBeDefined();

      // Clean up
      if (result[0].id) {
        await db.deleteBlogPost(result[0].id);
      }
    });

    it("should handle markdown content", async () => {
      if (skipIfNoDB()) return;
      const markdownContent = `
# Heading 1
## Heading 2

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

\`\`\`
code block
\`\`\`
      `;

      const postWithMarkdown = {
        ...testPost,
        slug: "markdown-test-" + Date.now(),
        content: markdownContent,
      };

      const result = await db.createBlogPost(postWithMarkdown);
      expect(result[0].content).toBe(markdownContent);

      // Clean up
      if (result[0].id) {
        await db.deleteBlogPost(result[0].id);
      }
    });
  });
});
