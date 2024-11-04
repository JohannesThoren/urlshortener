-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "session_expires" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_admin" ("email", "id", "passwordHash", "session", "session_expires") SELECT "email", "id", "passwordHash", "session", "session_expires" FROM "admin";
DROP TABLE "admin";
ALTER TABLE "new_admin" RENAME TO "admin";
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");
CREATE UNIQUE INDEX "admin_passwordHash_key" ON "admin"("passwordHash");
CREATE UNIQUE INDEX "admin_session_key" ON "admin"("session");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
