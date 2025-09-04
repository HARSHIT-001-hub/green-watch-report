import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Camera, Send, CheckCircle } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Issue } from "@/types/issue";
import { useToast } from "@/hooks/use-toast";
import { sampleIssues } from "@/data/sampleIssues";

const Index = () => {
  const [issues, setIssues] = useLocalStorage<Issue[]>("civic-issues", []);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    location: "",
    reporterName: "",
    reporterEmail: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize with sample data if no issues exist
  useEffect(() => {
    if (issues.length === 0) {
      setIssues(sampleIssues);
    }
  }, []);

  const categories = [
    "Road & Transportation", 
    "Water & Sewage", 
    "Garbage & Waste",
    "Street Lighting",
    "Parks & Recreation",
    "Public Safety",
    "Other"
  ];

  const priorities = ["low", "medium", "high"];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.reporterName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const newIssue: Issue = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: (formData.priority as Issue["priority"]) || "medium",
      status: "pending",
      location: formData.location || "Location not specified",
      reporterName: formData.reporterName,
      reporterEmail: formData.reporterEmail,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIssues(prev => [newIssue, ...prev]);
    
    toast({
      title: "Issue Reported Successfully!",
      description: "Your civic issue has been submitted to municipal authorities.",
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      priority: "",
      location: "",
      reporterName: "",
      reporterEmail: "",
    });

    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Report a Civic Issue
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help improve your community by reporting issues like potholes, broken streetlights, 
            or other problems that need municipal attention.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                {issues.length}
              </CardTitle>
              <p className="text-muted-foreground">Total Reports</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-warning">
                {issues.filter(i => i.status === "in-progress").length}
              </CardTitle>
              <p className="text-muted-foreground">In Progress</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-success">
                {issues.filter(i => i.status === "resolved").length}
              </CardTitle>
              <p className="text-muted-foreground">Resolved</p>
            </CardHeader>
          </Card>
        </div>

        {/* Report Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Submit New Issue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of the issue"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Street address or landmark"
                      className="pl-10"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map(priority => (
                        <SelectItem key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="reporterName">Your Name *</Label>
                  <Input
                    id="reporterName"
                    placeholder="Full name"
                    value={formData.reporterName}
                    onChange={(e) => handleInputChange("reporterName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reporterEmail">Email (Optional)</Label>
                  <Input
                    id="reporterEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.reporterEmail}
                    onChange={(e) => handleInputChange("reporterEmail", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 border border-dashed rounded-lg">
                <Camera className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Photo Upload (Coming Soon)</p>
                  <p className="text-sm text-muted-foreground">
                    Attach photos to help authorities understand the issue better
                  </p>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Issue Report
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
