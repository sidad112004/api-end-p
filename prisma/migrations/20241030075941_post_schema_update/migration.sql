/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - Added the required column `apiName` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "apiName" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL;
