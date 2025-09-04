export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "resolved";
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  reporterName: string;
  reporterEmail: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}