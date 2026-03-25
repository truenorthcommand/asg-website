import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

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

interface EditPostModalProps {
  post: BlogPost;
  onSave: (post: BlogPost) => void;
  onClose: () => void;
  isSaving?: boolean;
}

export function EditPostModal({
  post,
  onSave,
  onClose,
  isSaving = false,
}: EditPostModalProps) {
  const [formData, setFormData] = useState<BlogPost>(post);

  const handleChange = (
    field: keyof BlogPost,
    value: string | number | Date
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Blog post title"
            />
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug">Slug (URL-friendly)</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="blog-post-slug"
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                handleChange(
                  "category",
                  value as "maintenance" | "case-study" | "emergency"
                )
              }
            >
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="case-study">Case Study</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Excerpt */}
          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleChange("excerpt", e.target.value)}
              placeholder="Short summary of the post"
              rows={2}
            />
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content">Content (Markdown)</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Post content in Markdown format"
              rows={8}
            />
          </div>

          {/* Meta Description */}
          <div>
            <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
            <Input
              id="metaDescription"
              value={formData.metaDescription}
              onChange={(e) => handleChange("metaDescription", e.target.value)}
              placeholder="SEO meta description (max 160 chars)"
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.metaDescription.length}/160
            </p>
          </div>

          {/* Featured Image URL */}
          <div>
            <Label htmlFor="featuredImage">Featured Image URL</Label>
            <Input
              id="featuredImage"
              value={formData.featuredImage}
              onChange={(e) => handleChange("featuredImage", e.target.value)}
              placeholder="https://cdn.example.com/image.jpg"
              type="url"
            />
          </div>

          {/* Read Time */}
          <div>
            <Label htmlFor="readTime">Read Time (minutes)</Label>
            <Input
              id="readTime"
              type="number"
              value={formData.readTime}
              onChange={(e) => handleChange("readTime", parseInt(e.target.value))}
              min={1}
              max={60}
            />
          </div>

          {/* Author */}
          <div>
            <Label htmlFor="author">Author</Label>
            <Select
              value={formData.author}
              onValueChange={(value) =>
                handleChange("author", value as "AI" | "Human")
              }
            >
              <SelectTrigger id="author">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AI">AI Generated</SelectItem>
                <SelectItem value="Human">Human Written</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                handleChange("status", value as "draft" | "scheduled" | "published")
              }
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Publish Date */}
          <div>
            <Label htmlFor="publishDate">Publish Date</Label>
            <Input
              id="publishDate"
              type="datetime-local"
              value={
                formData.publishDate instanceof Date
                  ? formData.publishDate.toISOString().slice(0, 16)
                  : new Date(formData.publishDate).toISOString().slice(0, 16)
              }
              onChange={(e) =>
                handleChange("publishDate", new Date(e.target.value))
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
