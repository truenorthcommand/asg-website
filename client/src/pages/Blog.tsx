import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

type Category = "maintenance" | "case-study" | "emergency" | "all";

export function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  // Fetch published posts
  const { data: posts = [], isLoading } = trpc.blog.getPublished.useQuery({
    limit: 100,
  });

  // Filter posts based on search and category
  const filteredPosts = posts.filter((post: any) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categoryOptions: { value: Category; label: string }[] = [
    { value: "all", label: "All Posts" },
    { value: "maintenance", label: "Maintenance" },
    { value: "case-study", label: "Case Studies" },
    { value: "emergency", label: "Emergency" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">ASG Blog</h1>
          <p className="text-lg text-green-100">
            Expert insights on property maintenance, emergency response, and
            refurbishment best practices.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as Category)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-600 mb-6">
          Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
        </p>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <p className="text-lg">No posts found matching your criteria.</p>
              <p className="text-sm mt-2">Try adjusting your search or filters.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                  {/* Featured Image */}
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />

                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </div>
                      <Badge variant="outline" className="flex-shrink-0">
                        {post.category}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.readTime} min read</span>
                      <span>
                        {new Date(post.publishDate).toLocaleDateString()}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      className="mt-4 w-full text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
