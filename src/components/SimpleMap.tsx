import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Issue } from "@/types/issue";

interface SimpleMapProps {
  issues: Issue[];
}

export const SimpleMap = ({ issues }: SimpleMapProps) => {
  const statusColors = {
    pending: "bg-muted-foreground",
    "in-progress": "bg-warning", 
    resolved: "bg-success"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Issues Map Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-muted rounded-lg h-64 flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="font-medium">Interactive Map</h3>
            <p className="text-sm text-muted-foreground">
              Map integration coming soon
            </p>
          </div>
          
          {/* Simple visualization of issue locations */}
          <div className="absolute inset-4 pointer-events-none">
            {issues.slice(0, 5).map((issue, index) => (
              <div
                key={issue.id}
                className={`absolute w-3 h-3 rounded-full ${statusColors[issue.status]}`}
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 10)}%`,
                }}
                title={issue.title}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-sm">Legend</h4>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-warning" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>Resolved</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};