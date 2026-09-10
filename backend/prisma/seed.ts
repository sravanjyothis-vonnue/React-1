// prisma/seed.ts
import { prisma } from "../src/db/connect.ts";

const projects = [
  {
    projectId: 1,
    status: "Active",
    due: "Ends Friday",
    title: "Foundry Engine",
    scope: "System",
    description: "Refactor canvas rendering memory leak on font upload",
  },
  {
    projectId: 2,
    status: "Sprint 12",
    due: "Ends Today",
    title: "Marketing site",
    scope: "Work",
    description: "Update specimen preview Mobile responsive grid",
  },
  {
    projectId: 3,
    status: "Backlog",
    due: "Ends Tomorrow",
    title: "User analytics",
    scope: "Internal",
    description: "Heatmap data collection Conversion funnel v2",
  },
  {
    projectId: 4,
    status: "In Review",
    due: "Ends Monday",
    title: "Auth Gateway",
    scope: "Backend",
    description: "Migrate session tokens to rotating refresh token flow",
  },
  {
    projectId: 5,
    status: "Blocked",
    due: "Ends Wednesday",
    title: "Order Sync Service",
    scope: "Integration",
    description: "Reconcile duplicate order events from webhook retries",
  },
  {
    projectId: 6,
    status: "Active",
    due: "Ends Thursday",
    title: "Dashboard UI Revamp",
    scope: "Frontend",
    description: "Replace legacy chart library with new theming support",
  },
  {
    projectId: 7,
    status: "Completed",
    due: "Ended Tuesday",
    title: "Notification Pipeline",
    scope: "Backend",
    description:
      "Add retry with exponential backoff for failed push notifications",
  },
  {
    projectId: 8,
    status: "Active",
    due: "Ends Sunday",
    title: "Inventory Search",
    scope: "System",
    description: "Add fuzzy matching to product search index",
  },
];

// Helper: converts relative day text to an actual Date, relative to today
function relativeDateToDate(text: string): Date {
  const today = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (text === "Tomorrow") {
    const d = new Date(today);
    d.setDate(d.getDate() + 1);
    return d;
  }
  if (text === "Next week") {
    const d = new Date(today);
    d.setDate(d.getDate() + 7);
    return d;
  }
  const dayIndex = daysOfWeek.indexOf(text);
  if (dayIndex !== -1) {
    const d = new Date(today);
    const diff = (dayIndex + 7 - d.getDay()) % 7 || 7; // next occurrence of that weekday
    d.setDate(d.getDate() + diff);
    return d;
  }
  // fallback, shouldn't hit this with current data
  return today;
}

// Helper: maps display status strings to your `stat` enum values
function toStatEnum(status: string): "Pending" | "In_Progress" | "Blocked" {
  const map: Record<string, "Pending" | "In_Progress" | "Blocked"> = {
    Pending: "Pending",
    "In Progress": "In_Progress",
    Blocked: "Blocked",
  };
  const mapped = map[status];
  if (!mapped) throw new Error(`Unrecognized issue status: "${status}"`);
  return mapped;
}

const issuesData = [
  {
    issueId: 1,
    projectId: 1,
    title: "Payment gateway down",
    due: "Tomorrow",
    assignee: "Hope",
    priority: "High",
    status: "Pending",
  },
  {
    issueId: 2,
    projectId: 1,
    title: "Cart total miscalculating tax",
    due: "Friday",
    assignee: "Marcus",
    priority: "High",
    status: "In Progress",
  },
  {
    issueId: 3,
    projectId: 2,
    title: "Session token expiring early",
    due: "Wednesday",
    assignee: "Priya",
    priority: "Medium",
    status: "Pending",
  },
  {
    issueId: 4,
    projectId: 2,
    title: "OAuth redirect loop on mobile",
    due: "Monday",
    assignee: "Hope",
    priority: "High",
    status: "Blocked",
  },
  {
    issueId: 5,
    projectId: 3,
    title: "Duplicate order events from webhook",
    due: "Thursday",
    assignee: "Dae-sung",
    priority: "Medium",
    status: "In Progress",
  },
  {
    issueId: 6,
    projectId: 4,
    title: "Chart tooltip overlapping on small screens",
    due: "Next week",
    assignee: "Marcus",
    priority: "Low",
    status: "Pending",
  },
];

async function main() {
  for (const project of projects) {
    await prisma.projects.upsert({
      where: { projectId: project.projectId },
      update: project,
      create: project,
    });
  }
  console.log(`Seeded ${projects.length} projects.`);

  for (const issue of issuesData) {
    await prisma.issues.upsert({
      where: { issueId: issue.issueId },
      update: {
        projectId: issue.projectId,
        title: issue.title,
        due: relativeDateToDate(issue.due),
        assignee: issue.assignee,
        priority: issue.priority as "Low" | "Medium" | "High",
        status: toStatEnum(issue.status),
      },
      create: {
        issueId: issue.issueId,
        projectId: issue.projectId,
        title: issue.title,
        due: relativeDateToDate(issue.due),
        assignee: issue.assignee,
        priority: issue.priority as "Low" | "Medium" | "High",
        status: toStatEnum(issue.status),
      },
    });
  }
  console.log(`Seeded ${issuesData.length} issues.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
