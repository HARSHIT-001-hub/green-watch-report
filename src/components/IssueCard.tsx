import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, User } from "lucide-react";
import { Issue } from "@/types/issue";

interface IssueCardProps {
  issue: Issue;
  onStatusChange?: (id: string, status: Issue["status"]) => void;
  showActions?: boolean;
}

export const IssueCard = ({ issue, onStatusChange, showActions = false }: IssueCardProps) => {
  const handleStatusChange = (newStatus: Issue["status"]) => {
    if (onStatusChange) {
      onStatusChange(issue.id, newStatus);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{issue.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {issue.reporterName}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(issue.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <StatusBadge status={issue.status} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-foreground">{issue.description}</p>
        
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{issue.location}</span>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary">{issue.category}</Badge>
          <Badge variant="outline">{issue.priority}</Badge>
        </div>

        {issue.imageUrl && (
          <div className="mt-4">
            <img 
              src={issue.imageUrl} 
              alt="Issue evidence"
              className="rounded-lg w-full max-w-sm h-48 object-cover"
            />
          </div>
        )}

        {showActions && issue.status !== "resolved" && (
          <div className="flex gap-2 pt-4">
            {issue.status === "pending" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange("in-progress")}
              >
                Start Progress
              </Button>
            )}
            {issue.status === "in-progress" && (
              <Button
                size="sm"
                className="bg-success hover:bg-success/90"
                onClick={() => handleStatusChange("resolved")}
              >
                Mark Resolved
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};