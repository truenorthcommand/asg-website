import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, RefreshCw } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { EditPostModal } from "./BlogEditPostModal";
import { PreviewModal } from "./BlogPreviewModal";
import { DraftPostCard } from "./DraftPostCard";
import { toast } from "sonner";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "maintenance" | "case-study" | "emergency";
  featuredImage: string;
  metaDescription: string;
  readTime: number;
  author: "AI" | "Human";
  status: "draft" | "scheduled" | "published";
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
  editedBy: number | null;
  views: number | null;
};

type Tab = "drafts" | "scheduled" | "live";

export function BlogAdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("drafts");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [previewingPost, setPreviewingPost] = useState<BlogPost | null>(null);

  // Fetch blog posts by status
  const draftsQuery = trpc.blog.getDrafts.useQuery(undefined, {
    enabled: activeTab === "drafts",
  });
  const scheduledQuery = trpc.blog.getScheduled.useQuery(undefined, {
    enabled: activeTab === "scheduled",
  });
  const publishedQuery = trpc.blog.getPublished.useQuery(
    { limit: 100 },
    { enabled: activeTab === "live" }
  );

  // Mutations
  const approveDraftMutation = trpc.blog.approveDraft.useMutation({
    onSuccess: () => {
      toast.success("Post approved and scheduled");
      draftsQuery.refetch();
      scheduledQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to approve post");
    },
  });

  const rejectDraftMutation = trpc.blog.rejectDraft.useMutation({
    onSuccess: () => {
      toast.success("Post rejected");
      draftsQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reject post");
    },
  });

  const publishNowMutation = trpc.blog.publishNow.useMutation({
    onSuccess: () => {
      toast.success("Post published immediately");
      scheduledQuery.refetch();
      publishedQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to publish post");
    },
  });

  const updatePostMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Post updated");
      setEditingPost(null);
      draftsQuery.refetch();
      scheduledQuery.refetch();
      publishedQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update post");
    },
  });

  const deletePostMutation = trpc.blog.delete.useMutation({
    onSuccess: () => {
      toast.success("Post deleted");
      draftsQuery.refetch();
      scheduledQuery.refetch();
      publishedQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete post");
    },
  });

  const handleApproveDraft = (postId: number, publishDate?: Date) => {
    approveDraftMutation.mutate({ id: postId, publishDate });
  };

  const handleRejectDraft = (postId: number, reason?: string) => {
    rejectDraftMutation.mutate({ id: postId, reason });
  };

  const handlePublishNow = (postId: number) => {
    publishNowMutation.mutate({ id: postId });
  };

  const handleSavePost = (post: BlogPost) => {
    const { id, ...updateData } = post;
    updatePostMutation.mutate({ id, ...updateData });
  };

  const handleDeletePost = (postId: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePostMutation.mutate({ id: postId });
    }
  };

  const drafts = (draftsQuery.data || []) as BlogPost[];
  const scheduled = (scheduledQuery.data || []) as BlogPost[];
  const published = (publishedQuery.data || []) as BlogPost[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Admin Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Tab)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="drafts">
            Drafts <Badge className="ml-2">{drafts.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            Scheduled <Badge className="ml-2">{scheduled.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="live">
            Live <Badge className="ml-2">{published.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Drafts Tab */}
        <TabsContent value="drafts" className="space-y-4">
          {draftsQuery.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : drafts.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-gray-500">
                No draft posts yet. AI will generate new posts on schedule.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {drafts.map((post) => (
                <DraftPostCard
                  key={post.id}
                  post={post}
                  onEdit={() => setEditingPost(post)}
                  onPreview={() => setPreviewingPost(post)}
                  onApprove={() => handleApproveDraft(post.id)}
                  onReject={() => handleRejectDraft(post.id)}
                  onDelete={() => handleDeletePost(post.id)}
                  isLoading={approveDraftMutation.isPending || rejectDraftMutation.isPending}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Scheduled Tab */}
        <TabsContent value="scheduled" className="space-y-4">
          {scheduledQuery.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : scheduled.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-gray-500">
                No scheduled posts. Approve drafts to schedule them.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {scheduled.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{post.title}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{post.excerpt}</p>
                      </div>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Scheduled for</p>
                        <p className="font-semibold">
                          {new Date(post.publishDate).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Read time</p>
                        <p className="font-semibold">{post.readTime} min</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewingPost(post)}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPost(post)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handlePublishNow(post.id)}
                        disabled={publishNowMutation.isPending}
                      >
                        {publishNowMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Publish Now"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Live Tab */}
        <TabsContent value="live" className="space-y-4">
          {publishedQuery.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : published.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-gray-500">
                No published posts yet.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {published.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{post.title}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{post.excerpt}</p>
                      </div>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Published</p>
                        <p className="font-semibold">
                          {new Date(post.publishDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Views</p>
                        <p className="font-semibold">{post.views || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Read time</p>
                        <p className="font-semibold">{post.readTime} min</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewingPost(post)}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPost(post)}
                      >
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Modal */}
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onSave={handleSavePost}
          onClose={() => setEditingPost(null)}
          isSaving={updatePostMutation.isPending}
        />
      )}

      {/* Preview Modal */}
      {previewingPost && (
        <PreviewModal
          post={previewingPost}
          onClose={() => setPreviewingPost(null)}
        />
      )}
    </div>
  );
}
