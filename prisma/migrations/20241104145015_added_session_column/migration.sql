/*
  Warnings:

  - Added the required column `session` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "session" TEXT NOT NULL
);
INSERT INTO "new_admin" ("email", "id", "passwordHash") SELECT "email", "id", "passwordHash" FROM "admin";
DROP TABLE "admin";
ALTER TABLE "new_admin" RENAME TO "admin";
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");
CREATE UNIQUE INDEX "admin_passwordHash_key" ON "admin"("passwordHash");
CREATE UNIQUE INDEX "admin_session_key" ON "admin"("session");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
