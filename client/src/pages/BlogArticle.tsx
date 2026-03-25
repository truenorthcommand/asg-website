import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Share2, Calendar, Clock, User } from "lucide-react";
import { Streamdown } from "streamdown";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();

  // Fetch the blog post
  const { data: post, isLoading, error } = trpc.blog.getBySlug.useQuery(
    { slug: slug || "" },
    { enabled: !!slug }
  );

  // Fetch related posts
  const { data: relatedPosts = [] } = trpc.blog.getRelated.useQuery(
    { slug: slug || "", limit: 3 },
    { enabled: !!slug && !!post }
  );

  // Increment view count
  const incrementViewsMutation = trpc.blog.incrementViews.useMutation();

  useEffect(() => {
    if (post) {
      incrementViewsMutation.mutate({ id: post.id });
    }
  }, [post?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container py-12">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <h2 className="font-semibold text-red-900 mb-2">Post Not Found</h2>
              <p className="text-sm text-red-800 mb-4">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/blog">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container py-4">
        <Link href="/blog">
          <Button variant="ghost" className="text-green-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero Section with Featured Image */}
      <div className="w-full h-96 overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="container py-12 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge>{post.category}</Badge>
            <Badge variant="outline">{post.author}</Badge>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>

          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-t border-b py-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.publishDate).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Adapt Services Group</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="ml-auto"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none mb-12">
          <Streamdown>{post.content}</Streamdown>
        </div>

        {/* Author Bio */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-12">
          <h3 className="font-semibold text-lg mb-2">About Adapt Services Group</h3>
          <p className="text-gray-700">
            Adapt Services Group (ASG) is a UK-based property maintenance and
            refurbishment company operating in Kent. We provide fast, reliable
            property maintenance services for homeowners and landlords, with 24/7
            emergency response and 5-year workmanship guarantees.
          </p>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((relatedPost: any) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                    <img
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover"
                    />
                    <CardContent className="pt-4">
                      <h3 className="font-semibold line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="mt-4 text-xs text-gray-500">
                        {relatedPost.readTime} min read
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Property Maintenance?</h2>
          <p className="mb-6 text-green-100">
            Contact ASG for fast, reliable property maintenance and emergency
            response services in Kent.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-green-600 hover:bg-green-50">
              Get in Touch
            </Button>
          </Link>
        </div>
      </article>

      {/* SEO Meta Tags */}
      <head>
        <title>{post.title} | ASG Blog</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="og:title" content={post.title} />
        <meta name="og:description" content={post.excerpt} />
        <meta name="og:image" content={post.featuredImage} />
        <meta name="og:type" content="article" />
        <meta name="article:published_time" content={post.publishDate.toString()} />
        <meta name="article:author" content="Adapt Services Group" />
      </head>
    </div>
  );
}
