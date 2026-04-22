-- AlterTable
ALTER TABLE "repositories" ALTER COLUMN "is_private" DROP DEFAULT;

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "repository_id" TEXT NOT NULL,
    "type" VARCHAR(127) NOT NULL,
    "actor" VARCHAR(127) NOT NULL,
    "actor_avatar" TEXT,
    "repo" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "meta" JSONB,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "events_workspace_id_occurred_at_idx" ON "events"("workspace_id", "occurred_at" DESC);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
