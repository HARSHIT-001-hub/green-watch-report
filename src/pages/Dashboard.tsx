import { useState, useMemo, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { IssueCard } from "@/components/IssueCard";
import { SimpleMap } from "@/components/SimpleMap";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Issue } from "@/types/issue";
import { useToast } from "@/hooks/use-toast";
import { sampleIssues } from "@/data/sampleIssues";

const Dashboard = () => {
  const [issues, setIssues] = useLocalStorage<Issue[]>("civic-issues", []);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { toast } = useToast();

  // Initialize with sample data if no issues exist
  useEffect(() => {
    if (issues.length === 0) {
      setIssues(sampleIssues);
    }
  }, []);

  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const statusMatch = statusFilter === "all" || issue.status === statusFilter;
      const categoryMatch = categoryFilter === "all" || issue.category === categoryFilter;
      return statusMatch && categoryMatch;
    });
  }, [issues, statusFilter, categoryFilter]);

  const stats = useMemo(() => {
    const total = issues.length;
    const pending = issues.filter(i => i.status === "pending").length;
    const inProgress = issues.filter(i => i.status === "in-progress").length;
    const resolved = issues.filter(i => i.status === "resolved").length;
    
    return { total, pending, inProgress, resolved };
  }, [issues]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(issues.map(issue => issue.category))];
    return uniqueCategories;
  }, [issues]);

  const handleStatusChange = (id: string, newStatus: Issue["status"]) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === id 
          ? { ...issue, status: newStatus, updatedAt: new Date().toISOString() }
          : issue
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Issue status changed to ${newStatus}`,
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Municipal Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage civic issues reported by citizens
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">{stats.pending}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.inProgress}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.resolved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Map Overview */}
        <SimpleMap issues={issues} />

        {/* Issues List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Issues ({filteredIssues.length})
            </h2>
          </div>

          {filteredIssues.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No issues found</h3>
                <p className="text-muted-foreground">
                  {issues.length === 0 
                    ? "No issues have been reported yet." 
                    : "No issues match your current filters."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredIssues.map(issue => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onStatusChange={handleStatusChange}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;