import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Streamdown } from "streamdown";
import { X } from "lucide-react";

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

interface PreviewModalProps {
  post: BlogPost;
  onClose: () => void;
}

export function PreviewModal({ post, onClose }: PreviewModalProps) {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Preview: {post.title}</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <Tabs defaultValue="desktop" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>

          {/* Desktop Preview */}
          <TabsContent value="desktop" className="mt-4">
            <div className="bg-white rounded-lg border">
              {/* Featured Image */}
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-96 object-cover rounded-t-lg"
              />

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge>{post.category}</Badge>
                  <Badge variant="outline">{post.readTime} min read</Badge>
                  <Badge variant="secondary">{post.author}</Badge>
                </div>

                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

                <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>

                <div className="prose prose-lg max-w-none">
                  <Streamdown>{post.content}</Streamdown>
                </div>

                <div className="mt-8 pt-8 border-t text-sm text-gray-500">
                  <p>
                    Published:{" "}
                    {new Date(post.publishDate).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Mobile Preview */}
          <TabsContent value="mobile" className="mt-4">
            <div className="mx-auto max-w-sm bg-white rounded-lg border overflow-hidden">
              {/* Featured Image */}
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Badge className="text-xs">{post.category}</Badge>
                  <Badge variant="outline" className="text-xs">
                    {post.readTime} min
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {post.author}
                  </Badge>
                </div>

                <h1 className="text-2xl font-bold mb-3">{post.title}</h1>

                <p className="text-base text-gray-600 mb-4">{post.excerpt}</p>

                <div className="prose prose-sm max-w-none">
                  <Streamdown>{post.content}</Streamdown>
                </div>

                <div className="mt-6 pt-4 border-t text-xs text-gray-500">
                  <p>
                    Published:{" "}
                    {new Date(post.publishDate).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Meta Information */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">SEO Meta Information</h3>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-gray-600">Meta Description:</p>
              <p className="font-mono text-gray-900">{post.metaDescription}</p>
            </div>
            <div>
              <p className="text-gray-600">URL Slug:</p>
              <p className="font-mono text-gray-900">/blog/{post.slug}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
