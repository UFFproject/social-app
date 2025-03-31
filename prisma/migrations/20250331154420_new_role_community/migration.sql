/*
  Warnings:

  - Added the required column `roleId` to the `community_members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "community_members" ADD COLUMN     "roleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "community_roles" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "community_roles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "community_members" ADD CONSTRAINT "community_members_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "community_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
