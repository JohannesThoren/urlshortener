/*
  Warnings:

  - You are about to drop the column `session_exipres` on the `admin` table. All the data in the column will be lost.
  - Added the required column `session_expires` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "session_expires" DATETIME NOT NULL
);
INSERT INTO "new_admin" ("email", "id", "passwordHash", "session") SELECT "email", "id", "passwordHash", "session" FROM "admin";
DROP TABLE "admin";
ALTER TABLE "new_admin" RENAME TO "admin";
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");
CREATE UNIQUE INDEX "admin_passwordHash_key" ON "admin"("passwordHash");
CREATE UNIQUE INDEX "admin_session_key" ON "admin"("session");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
