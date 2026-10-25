import type { Application, Job, User } from "@/types";

export const DEMO_USERS: User[] = [
  {
    id: "user-admin-1",
    name: "Admin User",
    email: "admin@ethiohire.com",
    password: "admin123",
    role: "admin",
    createdAt: "2026-01-10T08:00:00.000Z",
  },
  {
    id: "user-seeker-1",
    name: "Abebe Kebede",
    email: "seeker@ethiohire.com",
    password: "seeker123",
    role: "seeker",
    createdAt: "2026-02-15T10:30:00.000Z",
  },
];

export const DEMO_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Junior Software Engineer",
    company: "Addis Tech Solutions",
    location: "Addis Ababa",
    type: "Full-time",
    category: "Technology",
    salary: "ETB 18,000 – 25,000 / month",
    description:
      "Join a growing product team building digital tools for Ethiopian businesses. You will work with senior engineers on web features, fix bugs, and learn modern development practices in a supportive environment.",
    requirements: [
      "Bachelor's degree in Computer Science or related field (or equivalent experience)",
      "Familiarity with JavaScript/TypeScript and React",
      "Basic understanding of REST APIs and Git",
      "Strong problem-solving mindset and willingness to learn",
    ],
    responsibilities: [
      "Implement UI features based on design specs",
      "Write clean, maintainable code and participate in code reviews",
      "Collaborate with designers and product managers",
      "Help improve documentation and onboarding materials",
    ],
    deadline: "2026-11-30",
    createdAt: "2026-09-01T09:00:00.000Z",
    updatedAt: "2026-09-01T09:00:00.000Z",
  },
  {
    id: "job-2",
    title: "Marketing Intern",
    company: "Horn Digital Agency",
    location: "Addis Ababa / Hybrid",
    type: "Internship",
    category: "Marketing",
    salary: "ETB 5,000 – 8,000 / month",
    description:
      "A 3–6 month internship for students and recent graduates interested in brand storytelling, social media, and campaign support for local and regional clients.",
    requirements: [
      "Currently enrolled in or recently graduated from a marketing, communications, or related program",
      "Comfortable writing in English and Amharic",
      "Basic knowledge of social media platforms",
      "Creative eye and attention to detail",
    ],
    responsibilities: [
      "Draft social media captions and simple campaign assets",
      "Assist with content calendars and posting schedules",
      "Support event and launch logistics",
      "Track engagement metrics and summarize findings",
    ],
    deadline: "2026-10-31",
    createdAt: "2026-09-05T11:00:00.000Z",
    updatedAt: "2026-09-05T11:00:00.000Z",
  },
  {
    id: "job-3",
    title: "Graduate Accountant",
    company: "Nile Finance PLC",
    location: "Bahir Dar",
    type: "Full-time",
    category: "Finance",
    salary: "ETB 12,000 – 16,000 / month",
    description:
      "Entry-level accounting role supporting monthly closes, reconciliations, and reporting for a mid-size finance company serving clients across Amhara region.",
    requirements: [
      "Degree in Accounting, Finance, or related discipline",
      "Understanding of basic accounting principles",
      "Proficiency with Excel; exposure to accounting software is a plus",
      "High integrity and confidentiality",
    ],
    responsibilities: [
      "Prepare journal entries and assist with reconciliations",
      "Support invoice processing and expense tracking",
      "Help compile monthly financial summaries",
      "Maintain organized digital and paper records",
    ],
    deadline: "2026-11-15",
    createdAt: "2026-09-10T08:30:00.000Z",
    updatedAt: "2026-09-10T08:30:00.000Z",
  },
  {
    id: "job-4",
    title: "Customer Support Associate",
    company: "Sheba Commerce",
    location: "Remote (Ethiopia)",
    type: "Full-time",
    category: "Customer Service",
    salary: "ETB 10,000 – 14,000 / month",
    description:
      "Help online shoppers with orders, returns, and product questions across chat, email, and phone. Ideal for clear communicators who enjoy solving problems.",
    requirements: [
      "Excellent written and spoken Amharic and English",
      "Patient, empathetic communication style",
      "Ability to learn product catalogs quickly",
      "Reliable internet connection for remote work",
    ],
    responsibilities: [
      "Respond to customer inquiries within SLA",
      "Escalate complex issues to the right team",
      "Document common questions for the knowledge base",
      "Provide feedback on recurring customer pain points",
    ],
    deadline: "2026-12-01",
    createdAt: "2026-09-12T14:00:00.000Z",
    updatedAt: "2026-09-12T14:00:00.000Z",
  },
  {
    id: "job-5",
    title: "Civil Engineering Graduate Trainee",
    company: "Abay Construction Group",
    location: "Hawassa",
    type: "Full-time",
    category: "Engineering",
    salary: "ETB 14,000 – 20,000 / month",
    description:
      "Structured graduate program rotating through site supervision, quantity surveying support, and project coordination on residential and infrastructure projects.",
    requirements: [
      "BSc in Civil Engineering (recent graduate preferred)",
      "Willingness to work on active construction sites",
      "Basic AutoCAD knowledge",
      "Valid driver's license is an advantage",
    ],
    responsibilities: [
      "Assist site engineers with daily inspections",
      "Help track materials and progress reports",
      "Support HSE compliance on site",
      "Participate in weekly project review meetings",
    ],
    deadline: "2026-11-20",
    createdAt: "2026-09-18T07:45:00.000Z",
    updatedAt: "2026-09-18T07:45:00.000Z",
  },
  {
    id: "job-6",
    title: "Part-time Data Entry Clerk",
    company: "Blue Nile Logistics",
    location: "Dire Dawa",
    type: "Part-time",
    category: "Operations",
    salary: "ETB 6,000 – 9,000 / month",
    description:
      "Flexible afternoon/evening role entering shipment records and updating tracking sheets for a regional logistics firm.",
    requirements: [
      "Fast and accurate typing skills",
      "Comfortable with spreadsheets and simple web forms",
      "Strong attention to detail",
      "Available at least 20 hours per week",
    ],
    responsibilities: [
      "Enter and verify shipment data",
      "Flag incomplete or inconsistent records",
      "Update status sheets for dispatch teams",
      "Maintain confidentiality of client information",
    ],
    deadline: "2026-10-28",
    createdAt: "2026-09-20T16:20:00.000Z",
    updatedAt: "2026-09-20T16:20:00.000Z",
  },
];

export const DEMO_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    jobId: "job-1",
    userId: "user-seeker-1",
    coverLetter:
      "I recently completed my Computer Science degree and built several React projects during internships. I am excited to grow as a junior engineer at Addis Tech Solutions.",
    status: "reviewed",
    appliedAt: "2026-09-22T12:00:00.000Z",
  },
  {
    id: "app-2",
    jobId: "job-2",
    userId: "user-seeker-1",
    coverLetter:
      "As a communications graduate with campus marketing experience, I would love to contribute to Horn Digital Agency's internship program.",
    status: "pending",
    appliedAt: "2026-09-25T09:15:00.000Z",
  },
];
