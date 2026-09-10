// prisma/seed.ts
import "dotenv/config";
import { prisma } from "../src/db/connect.ts";

const projects = [
  {
    projectId: 1,
    status: "Active",
    due: "Friday",
    title: "Foundry Engine",
    scope: "System",
    description: "Refactor canvas rendering memory leak on font upload",
  },
  {
    projectId: 2,
    status: "Sprint 12",
    due: "Today",
    title: "Marketing site",
    scope: "Work",
    description: "Update specimen preview Mobile responsive grid",
  },
  {
    projectId: 3,
    status: "Backlog",
    due: "Tomorrow",
    title: "User analytics",
    scope: "Internal",
    description: "Heatmap data collection Conversion funnel v2",
  },
  {
    projectId: 4,
    status: "In Review",
    due: "Monday",
    title: "Auth Gateway",
    scope: "Backend",
    description: "Migrate session tokens to rotating refresh token flow",
  },
  {
    projectId: 5,
    status: "Blocked",
    due: "Wednesday",
    title: "Order Sync Service",
    scope: "Integration",
    description: "Reconcile duplicate order events from webhook retries",
  },
  {
    projectId: 6,
    status: "Active",
    due: "Thursday",
    title: "Dashboard UI Revamp",
    scope: "Frontend",
    description: "Replace legacy chart library with new theming support",
  },
  {
    projectId: 7,
    status: "Completed",
    due: "Tuesday",
    title: "Notification Pipeline",
    scope: "Backend",
    description:
      "Add retry with exponential backoff for failed push notifications",
  },
  {
    projectId: 8,
    status: "Active",
    due: "Sunday",
    title: "Inventory Search",
    scope: "System",
    description: "Add fuzzy matching to product search index",
  },
];

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

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function relativeDateToDate(text: string): Date {
  const today = new Date();
  if (text === "Today") return today;
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
  const dayIndex = DAYS.indexOf(text);
  if (dayIndex !== -1) {
    const d = new Date(today);
    const diff = (dayIndex + 7 - d.getDay()) % 7 || 7;
    d.setDate(d.getDate() + diff);
    return d;
  }
  throw new Error(`Unrecognized relative date: "${text}"`);
}

const STATUS_MAP: Record<string, "Pending" | "In_Progress" | "Blocked"> = {
  Pending: "Pending",
  "In Progress": "In_Progress",
  Blocked: "Blocked",
};
function toStatEnum(status: string) {
  const mapped = STATUS_MAP[status];
  if (!mapped) throw new Error(`Unrecognized issue status: "${status}"`);
  return mapped;
}

const PRIORITY_MAP: Record<string, "Low" | "Medium" | "High"> = {
  Low: "Low",
  Medium: "Medium",
  High: "High",
};
function toPriorityEnum(priority: string) {
  const mapped = PRIORITY_MAP[priority];
  if (!mapped) throw new Error(`Unrecognized priority: "${priority}"`);
  return mapped;
}

async function main() {
  for (const project of projects) {
    await prisma.projects.upsert({
      where: { projectId: project.projectId },
      update: { ...project, due: project.due },
      create: { ...project, due: project.due },
    });
  }
  console.log(`Seeded ${projects.length} projects.`);

  for (const issue of issuesData) {
    const data = {
      projectId: issue.projectId,
      title: issue.title,
      due: relativeDateToDate(issue.due),
      assignee: issue.assignee,
      priority: toPriorityEnum(issue.priority),
      status: toStatEnum(issue.status),
    };
    await prisma.issues.upsert({
      where: { issueId: issue.issueId },
      update: data,
      create: { issueId: issue.issueId, ...data },
    });
  }
  console.log(`Seeded ${issuesData.length} issues.`);
}

main()
  .then(() => console.log("Database fully seeded"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Resync autoincrement sequences after manually seeding explicit IDs
    await prisma.$executeRawUnsafe(`
  SELECT setval(
    pg_get_serial_sequence('"issues"', 'issueId'),
    COALESCE((SELECT MAX("issueId") FROM "issues"), 1)
  );
`);

    await prisma.$executeRawUnsafe(`
  SELECT setval(
    pg_get_serial_sequence('"projects"', 'projectId'),
    COALESCE((SELECT MAX("projectId") FROM "projects"), 1)
  );
`);
    await prisma.$disconnect();
  });
