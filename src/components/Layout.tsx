import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, BarChart3, FileText } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">CivicReport</span>
            </Link>

            <div className="flex items-center space-x-1">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                asChild
                size="sm"
              >
                <Link to="/">
                  <FileText className="mr-2 h-4 w-4" />
                  Report Issue
                </Link>
              </Button>
              <Button
                variant={isActive("/dashboard") ? "default" : "ghost"}
                asChild
                size="sm"
              >
                <Link to="/dashboard">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};