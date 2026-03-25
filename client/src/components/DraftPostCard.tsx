import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit2, Eye, CheckCircle, XCircle } from "lucide-react";

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

interface DraftPostCardProps {
  post: BlogPost;
  onEdit: () => void;
  onPreview: () => void;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
  isLoading?: boolean;
}

export function DraftPostCard({
  post,
  onEdit,
  onPreview,
  onApprove,
  onReject,
  onDelete,
  isLoading = false,
}: DraftPostCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle>{post.title}</CardTitle>
              <Badge variant="secondary">{post.author}</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">{post.excerpt}</p>
          </div>
          <Badge variant="outline">{post.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Created</p>
            <p className="font-semibold text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Read time</p>
            <p className="font-semibold text-sm">{post.readTime} min</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <Badge className="text-sm">Draft</Badge>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
            disabled={isLoading}
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            disabled={isLoading}
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            onClick={onApprove}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onReject}
            disabled={isLoading}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <XCircle className="h-4 w-4 mr-1" />
            Reject
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            disabled={isLoading}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
