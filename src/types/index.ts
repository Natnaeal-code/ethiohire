
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  category: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  deadline: string;
  createdAt: string;
  updatedAt: string;
}
