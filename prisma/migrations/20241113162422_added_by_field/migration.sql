-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event_type" TEXT NOT NULL,
    "event_data" TEXT NOT NULL,
    "by" TEXT NOT NULL DEFAULT 'N/A',
    "time_stamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_event" ("event_data", "event_type", "id", "time_stamp") SELECT "event_data", "event_type", "id", "time_stamp" FROM "event";
DROP TABLE "event";
ALTER TABLE "new_event" RENAME TO "event";
CREATE UNIQUE INDEX "event_id_key" ON "event"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
