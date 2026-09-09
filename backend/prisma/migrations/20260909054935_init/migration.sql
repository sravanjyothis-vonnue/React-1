-- CreateEnum
CREATE TYPE "roles" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "prioritys" AS ENUM ('Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "stat" AS ENUM ('Pending', 'In_Progress', 'Blocked');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "roles" NOT NULL DEFAULT 'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "projectId" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "due" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "issues" (
    "issueId" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "due" TIMESTAMP(3) NOT NULL,
    "assignee" TEXT NOT NULL,
    "priority" "prioritys" NOT NULL DEFAULT 'Low',
    "status" "stat" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "issues_pkey" PRIMARY KEY ("issueId")
);

-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "team_src_key" ON "team"("src");

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;
