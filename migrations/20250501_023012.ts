import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_news_post_reference_type" AS ENUM('new', 'existing');
  CREATE TYPE "public"."enum__news_post_v_version_reference_type" AS ENUM('new', 'existing');
  ALTER TABLE "news_post" ADD COLUMN "reference_type" "enum_news_post_reference_type";
  ALTER TABLE "news_post_rels" ADD COLUMN "charity_id" integer;
  ALTER TABLE "news_post_rels" ADD COLUMN "fundraiser_id" integer;
  ALTER TABLE "news_post_rels" ADD COLUMN "event_id" integer;
  ALTER TABLE "news_post_rels" ADD COLUMN "local_court_id" integer;
  ALTER TABLE "news_post_rels" ADD COLUMN "page_id" integer;
  ALTER TABLE "news_post_rels" ADD COLUMN "project_id" integer;
  ALTER TABLE "_news_post_v" ADD COLUMN "version_reference_type" "enum__news_post_v_version_reference_type";
  ALTER TABLE "_news_post_v_rels" ADD COLUMN "charity_id" integer;
  ALTER TABLE "_news_post_v_rels" ADD COLUMN "fundraiser_id" integer;
  ALTER TABLE "_news_post_v_rels" ADD COLUMN "event_id" integer;
  ALTER TABLE "_news_post_v_rels" ADD COLUMN "local_court_id" integer;
  ALTER TABLE "_news_post_v_rels" ADD COLUMN "page_id" integer;
  ALTER TABLE "_news_post_v_rels" ADD COLUMN "project_id" integer;
  DO $$ BEGIN
   ALTER TABLE "news_post_rels" ADD CONSTRAINT "news_post_rels_charity_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charity"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_post_rels" ADD CONSTRAINT "news_post_rels_fundraiser_fk" FOREIGN KEY ("fundraiser_id") REFERENCES "public"."fundraiser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_post_rels" ADD CONSTRAINT "news_post_rels_event_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_post_rels" ADD CONSTRAINT "news_post_rels_local_court_fk" FOREIGN KEY ("local_court_id") REFERENCES "public"."local_court"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_post_rels" ADD CONSTRAINT "news_post_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_post_rels" ADD CONSTRAINT "news_post_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_news_post_v_rels" ADD CONSTRAINT "_news_post_v_rels_charity_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charity"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_news_post_v_rels" ADD CONSTRAINT "_news_post_v_rels_fundraiser_fk" FOREIGN KEY ("fundraiser_id") REFERENCES "public"."fundraiser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_news_post_v_rels" ADD CONSTRAINT "_news_post_v_rels_event_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_news_post_v_rels" ADD CONSTRAINT "_news_post_v_rels_local_court_fk" FOREIGN KEY ("local_court_id") REFERENCES "public"."local_court"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_news_post_v_rels" ADD CONSTRAINT "_news_post_v_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_news_post_v_rels" ADD CONSTRAINT "_news_post_v_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "news_post_rels_charity_id_idx" ON "news_post_rels" USING btree ("charity_id");
  CREATE INDEX IF NOT EXISTS "news_post_rels_fundraiser_id_idx" ON "news_post_rels" USING btree ("fundraiser_id");
  CREATE INDEX IF NOT EXISTS "news_post_rels_event_id_idx" ON "news_post_rels" USING btree ("event_id");
  CREATE INDEX IF NOT EXISTS "news_post_rels_local_court_id_idx" ON "news_post_rels" USING btree ("local_court_id");
  CREATE INDEX IF NOT EXISTS "news_post_rels_page_id_idx" ON "news_post_rels" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "news_post_rels_project_id_idx" ON "news_post_rels" USING btree ("project_id");
  CREATE INDEX IF NOT EXISTS "_news_post_v_rels_charity_id_idx" ON "_news_post_v_rels" USING btree ("charity_id");
  CREATE INDEX IF NOT EXISTS "_news_post_v_rels_fundraiser_id_idx" ON "_news_post_v_rels" USING btree ("fundraiser_id");
  CREATE INDEX IF NOT EXISTS "_news_post_v_rels_event_id_idx" ON "_news_post_v_rels" USING btree ("event_id");
  CREATE INDEX IF NOT EXISTS "_news_post_v_rels_local_court_id_idx" ON "_news_post_v_rels" USING btree ("local_court_id");
  CREATE INDEX IF NOT EXISTS "_news_post_v_rels_page_id_idx" ON "_news_post_v_rels" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "_news_post_v_rels_project_id_idx" ON "_news_post_v_rels" USING btree ("project_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "news_post_rels" DROP CONSTRAINT "news_post_rels_charity_fk";
  
  ALTER TABLE "news_post_rels" DROP CONSTRAINT "news_post_rels_fundraiser_fk";
  
  ALTER TABLE "news_post_rels" DROP CONSTRAINT "news_post_rels_event_fk";
  
  ALTER TABLE "news_post_rels" DROP CONSTRAINT "news_post_rels_local_court_fk";
  
  ALTER TABLE "news_post_rels" DROP CONSTRAINT "news_post_rels_page_fk";
  
  ALTER TABLE "news_post_rels" DROP CONSTRAINT "news_post_rels_project_fk";
  
  ALTER TABLE "_news_post_v_rels" DROP CONSTRAINT "_news_post_v_rels_charity_fk";
  
  ALTER TABLE "_news_post_v_rels" DROP CONSTRAINT "_news_post_v_rels_fundraiser_fk";
  
  ALTER TABLE "_news_post_v_rels" DROP CONSTRAINT "_news_post_v_rels_event_fk";
  
  ALTER TABLE "_news_post_v_rels" DROP CONSTRAINT "_news_post_v_rels_local_court_fk";
  
  ALTER TABLE "_news_post_v_rels" DROP CONSTRAINT "_news_post_v_rels_page_fk";
  
  ALTER TABLE "_news_post_v_rels" DROP CONSTRAINT "_news_post_v_rels_project_fk";
  
  DROP INDEX IF EXISTS "news_post_rels_charity_id_idx";
  DROP INDEX IF EXISTS "news_post_rels_fundraiser_id_idx";
  DROP INDEX IF EXISTS "news_post_rels_event_id_idx";
  DROP INDEX IF EXISTS "news_post_rels_local_court_id_idx";
  DROP INDEX IF EXISTS "news_post_rels_page_id_idx";
  DROP INDEX IF EXISTS "news_post_rels_project_id_idx";
  DROP INDEX IF EXISTS "_news_post_v_rels_charity_id_idx";
  DROP INDEX IF EXISTS "_news_post_v_rels_fundraiser_id_idx";
  DROP INDEX IF EXISTS "_news_post_v_rels_event_id_idx";
  DROP INDEX IF EXISTS "_news_post_v_rels_local_court_id_idx";
  DROP INDEX IF EXISTS "_news_post_v_rels_page_id_idx";
  DROP INDEX IF EXISTS "_news_post_v_rels_project_id_idx";
  ALTER TABLE "news_post" DROP COLUMN IF EXISTS "reference_type";
  ALTER TABLE "news_post_rels" DROP COLUMN IF EXISTS "charity_id";
  ALTER TABLE "news_post_rels" DROP COLUMN IF EXISTS "fundraiser_id";
  ALTER TABLE "news_post_rels" DROP COLUMN IF EXISTS "event_id";
  ALTER TABLE "news_post_rels" DROP COLUMN IF EXISTS "local_court_id";
  ALTER TABLE "news_post_rels" DROP COLUMN IF EXISTS "page_id";
  ALTER TABLE "news_post_rels" DROP COLUMN IF EXISTS "project_id";
  ALTER TABLE "_news_post_v" DROP COLUMN IF EXISTS "version_reference_type";
  ALTER TABLE "_news_post_v_rels" DROP COLUMN IF EXISTS "charity_id";
  ALTER TABLE "_news_post_v_rels" DROP COLUMN IF EXISTS "fundraiser_id";
  ALTER TABLE "_news_post_v_rels" DROP COLUMN IF EXISTS "event_id";
  ALTER TABLE "_news_post_v_rels" DROP COLUMN IF EXISTS "local_court_id";
  ALTER TABLE "_news_post_v_rels" DROP COLUMN IF EXISTS "page_id";
  ALTER TABLE "_news_post_v_rels" DROP COLUMN IF EXISTS "project_id";
  DROP TYPE "public"."enum_news_post_reference_type";
  DROP TYPE "public"."enum__news_post_v_version_reference_type";`)
}
