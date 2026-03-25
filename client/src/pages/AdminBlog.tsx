import { useAuth } from "@/_core/hooks/useAuth";
import { BlogAdminDashboard } from "@/components/BlogAdminDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function AdminBlog() {
  const { user } = useAuth();

  // Check if user is admin
  if (!user || user.role !== "admin") {
    return (
      <div className="container py-12">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Access Denied</h3>
                <p className="text-sm text-red-800">
                  Only administrators can access the blog management dashboard.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <BlogAdminDashboard />
    </div>
  );
}
