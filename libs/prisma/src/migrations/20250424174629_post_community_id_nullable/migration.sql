-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_communityId_fkey";

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "communityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "communities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
