import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE UNIQUE INDEX IF NOT EXISTS "local_court_slug_idx" ON "local_court" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_version_slug_idx" ON "_local_court_v" USING btree ("version_slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "local_court_slug_idx";
  DROP INDEX IF EXISTS "_local_court_v_version_version_slug_idx";`)
}
