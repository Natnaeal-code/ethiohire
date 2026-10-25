"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Application, ApplicationStatus, Job, User, UserRole } from "@/types";
import { DEMO_APPLICATIONS, DEMO_JOBS, DEMO_USERS } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

interface SignUpInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

interface JobInput {
  title: string;
  company: string;
  location: string;
  type: Job["type"];
  category: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  deadline: string;
}

interface AppState {
  users: User[];
  currentUser: User | null;
  jobs: Job[];
  applications: Application[];
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  signUp: (input: SignUpInput) => { ok: boolean; error?: string };
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signOut: () => void;
  applyToJob: (
    jobId: string,
    coverLetter: string
  ) => { ok: boolean; error?: string };
  addJob: (input: JobInput) => { ok: boolean; error?: string };
  updateJob: (id: string, input: JobInput) => { ok: boolean; error?: string };
  deleteJob: (id: string) => { ok: boolean; error?: string };
  updateApplicationStatus: (
    id: string,
    status: ApplicationStatus
  ) => { ok: boolean; error?: string };
  getJobById: (id: string) => Job | undefined;
  getUserApplications: (userId: string) => Application[];
  hasApplied: (userId: string, jobId: string) => boolean;
  resetDemoData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      users: DEMO_USERS,
      currentUser: null,
      jobs: DEMO_JOBS,
      applications: DEMO_APPLICATIONS,
      hydrated: false,

      setHydrated: (value) => set({ hydrated: value }),

      signUp: ({ name, email, password, role = "seeker" }) => {
        const normalized = email.trim().toLowerCase();
        if (!name.trim() || !normalized || !password) {
          return { ok: false, error: "All fields are required." };
        }
        if (password.length < 6) {
          return { ok: false, error: "Password must be at least 6 characters." };
        }
        if (get().users.some((u) => u.email === normalized)) {
          return { ok: false, error: "An account with this email already exists." };
        }

        const user: User = {
          id: generateId("user"),
          name: name.trim(),
          email: normalized,
          password,
          role,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          users: [...state.users, user],
          currentUser: user,
        }));

        return { ok: true };
      },

      signIn: (email, password) => {
        const normalized = email.trim().toLowerCase();
        const user = get().users.find(
          (u) => u.email === normalized && u.password === password
        );
        if (!user) {
          return { ok: false, error: "Invalid email or password." };
        }
        set({ currentUser: user });
        return { ok: true };
      },

      signOut: () => set({ currentUser: null }),

      applyToJob: (jobId, coverLetter) => {
        const { currentUser, jobs, applications } = get();
        if (!currentUser) {
          return { ok: false, error: "Please sign in to apply." };
        }
        if (currentUser.role === "admin") {
          return { ok: false, error: "Administrators cannot apply for jobs." };
        }
        const job = jobs.find((j) => j.id === jobId);
        if (!job) {
          return { ok: false, error: "Job not found." };
        }
        if (applications.some((a) => a.userId === currentUser.id && a.jobId === jobId)) {
          return { ok: false, error: "You have already applied to this job." };
        }
        if (!coverLetter.trim()) {
          return { ok: false, error: "Please include a short cover letter." };
        }

        const application: Application = {
          id: generateId("app"),
          jobId,
          userId: currentUser.id,
          coverLetter: coverLetter.trim(),
          status: "pending",
          appliedAt: new Date().toISOString(),
        };

        set((state) => ({
          applications: [application, ...state.applications],
        }));

        return { ok: true };
      },

      addJob: (input) => {
        const { currentUser } = get();
        if (!currentUser || currentUser.role !== "admin") {
          return { ok: false, error: "Only administrators can add jobs." };
        }
        if (!input.title.trim() || !input.company.trim()) {
          return { ok: false, error: "Title and company are required." };
        }

        const now = new Date().toISOString();
        const job: Job = {
          id: generateId("job"),
          title: input.title.trim(),
          company: input.company.trim(),
          location: input.location.trim(),
          type: input.type,
          category: input.category.trim(),
          salary: input.salary.trim(),
          description: input.description.trim(),
          requirements: input.requirements.filter(Boolean),
          responsibilities: input.responsibilities.filter(Boolean),
          deadline: input.deadline,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({ jobs: [job, ...state.jobs] }));
        return { ok: true };
      },

      updateJob: (id, input) => {
        const { currentUser } = get();
        if (!currentUser || currentUser.role !== "admin") {
          return { ok: false, error: "Only administrators can update jobs." };
        }

        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === id
              ? {
                  ...job,
                  title: input.title.trim(),
                  company: input.company.trim(),
                  location: input.location.trim(),
                  type: input.type,
                  category: input.category.trim(),
                  salary: input.salary.trim(),
                  description: input.description.trim(),
                  requirements: input.requirements.filter(Boolean),
                  responsibilities: input.responsibilities.filter(Boolean),
                  deadline: input.deadline,
                  updatedAt: new Date().toISOString(),
                }
              : job
          ),
        }));

        return { ok: true };
      },

      deleteJob: (id) => {
        const { currentUser } = get();
        if (!currentUser || currentUser.role !== "admin") {
          return { ok: false, error: "Only administrators can delete jobs." };
        }

        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== id),
          applications: state.applications.filter((a) => a.jobId !== id),
        }));

        return { ok: true };
      },

      updateApplicationStatus: (id, status) => {
        const { currentUser } = get();
        if (!currentUser || currentUser.role !== "admin") {
          return { ok: false, error: "Only administrators can update status." };
        }

        set((state) => ({
          applications: state.applications.map((a) =>
            a.id === id ? { ...a, status } : a
          ),
        }));

        return { ok: true };
      },

      getJobById: (id) => get().jobs.find((j) => j.id === id),

      getUserApplications: (userId) =>
        get().applications.filter((a) => a.userId === userId),

      hasApplied: (userId, jobId) =>
        get().applications.some((a) => a.userId === userId && a.jobId === jobId),

      resetDemoData: () =>
        set({
          users: DEMO_USERS,
          currentUser: null,
          jobs: DEMO_JOBS,
          applications: DEMO_APPLICATIONS,
        }),
    }),
   {
  name: "ethio-hire-store",
  onRehydrateStorage: () => (state) => {
    state?.setHydrated(true);
  },
}
  )
);
