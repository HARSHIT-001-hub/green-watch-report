import { Issue } from "@/types/issue";

export const sampleIssues: Issue[] = [
  {
    id: "1",
    title: "Large pothole on Main Street",
    description: "There's a significant pothole near the intersection of Main Street and Oak Avenue that's causing damage to vehicles. It's been there for over a week and is getting worse with recent rain.",
    category: "Road & Transportation",
    priority: "high",
    status: "in-progress",
    location: "Main Street & Oak Avenue intersection",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    reporterName: "Sarah Johnson",
    reporterEmail: "sarah.j@email.com",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z"
  },
  {
    id: "2",
    title: "Broken streetlight in Riverside Park",
    description: "The streetlight near the playground in Riverside Park has been out for several nights. This creates a safety concern for families using the park in the evening.",
    category: "Street Lighting",
    priority: "medium",
    status: "pending",
    location: "Riverside Park, near playground",
    reporterName: "Mike Chen",
    reporterEmail: "m.chen@email.com",
    createdAt: "2024-01-14T18:45:00Z",
    updatedAt: "2024-01-14T18:45:00Z"
  },
  {
    id: "3",
    title: "Overflowing trash bins on Elm Street",
    description: "The public trash bins on Elm Street have been overflowing for the past three days. Garbage is scattered around the area and attracting pests.",
    category: "Garbage & Waste",
    priority: "high",
    status: "resolved",
    location: "Elm Street, between 2nd and 3rd Avenue",
    reporterName: "Lisa Rodriguez",
    reporterEmail: "lisa.r@email.com",
    createdAt: "2024-01-12T09:15:00Z",
    updatedAt: "2024-01-15T11:30:00Z"
  },
  {
    id: "4",
    title: "Water leak from fire hydrant",
    description: "Water is continuously leaking from the fire hydrant on Pine Street. The water is creating a puddle and might freeze in colder weather, creating a hazard.",
    category: "Water & Sewage",
    priority: "medium",
    status: "pending",
    location: "Pine Street, near house #245",
    reporterName: "Robert Kim",
    reporterEmail: "r.kim@email.com",
    createdAt: "2024-01-13T14:20:00Z",
    updatedAt: "2024-01-13T14:20:00Z"
  },
  {
    id: "5",
    title: "Graffiti on community center wall",
    description: "Someone has spray-painted graffiti on the south wall of the community center. It's visible from the main road and detracts from the area's appearance.",
    category: "Other",
    priority: "low",
    status: "pending",
    location: "Community Center, 123 Community Drive",
    reporterName: "Emma Thompson",
    reporterEmail: "emma.t@email.com",
    createdAt: "2024-01-11T16:30:00Z",
    updatedAt: "2024-01-11T16:30:00Z"
  }
];