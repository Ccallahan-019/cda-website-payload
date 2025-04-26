import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_blocks_archive_collection" AS ENUM('event', 'project', 'charity', 'fundraiser');
  CREATE TYPE "public"."enum_page_blocks_archive_type" AS ENUM('national', 'state', 'local');
  CREATE TYPE "public"."enum__page_v_blocks_archive_collection" AS ENUM('event', 'project', 'charity', 'fundraiser');
  CREATE TYPE "public"."enum__page_v_blocks_archive_type" AS ENUM('national', 'state', 'local');
  CREATE TABLE IF NOT EXISTS "page_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"collection" "enum_page_blocks_archive_collection" DEFAULT 'event',
  	"type" "enum_page_blocks_archive_type" DEFAULT 'state',
  	"auto_populate" boolean DEFAULT true,
  	"limit" numeric DEFAULT 10,
  	"pagination" boolean DEFAULT true,
  	"entries_per_page" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"collection" "enum__page_v_blocks_archive_collection" DEFAULT 'event',
  	"type" "enum__page_v_blocks_archive_type" DEFAULT 'state',
  	"auto_populate" boolean DEFAULT true,
  	"limit" numeric DEFAULT 10,
  	"pagination" boolean DEFAULT true,
  	"entries_per_page" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "page_blocks_court_listing_courts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_court_listing_courts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_blocks_court_listing_courts" CASCADE;
  DROP TABLE "_page_v_blocks_court_listing_courts" CASCADE;
  ALTER TABLE "page_rels" ADD COLUMN "local_court_id" integer;
  ALTER TABLE "page_rels" ADD COLUMN "event_id" integer;
  ALTER TABLE "page_rels" ADD COLUMN "charity_id" integer;
  ALTER TABLE "page_rels" ADD COLUMN "fundraiser_id" integer;
  ALTER TABLE "page_rels" ADD COLUMN "project_id" integer;
  ALTER TABLE "_page_v_rels" ADD COLUMN "local_court_id" integer;
  ALTER TABLE "_page_v_rels" ADD COLUMN "event_id" integer;
  ALTER TABLE "_page_v_rels" ADD COLUMN "charity_id" integer;
  ALTER TABLE "_page_v_rels" ADD COLUMN "fundraiser_id" integer;
  ALTER TABLE "_page_v_rels" ADD COLUMN "project_id" integer;
  DO $$ BEGIN
   ALTER TABLE "page_blocks_archive" ADD CONSTRAINT "page_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_archive" ADD CONSTRAINT "_page_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "page_blocks_archive_order_idx" ON "page_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_archive_parent_id_idx" ON "page_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_archive_path_idx" ON "page_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_archive_order_idx" ON "_page_v_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_archive_parent_id_idx" ON "_page_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_archive_path_idx" ON "_page_v_blocks_archive" USING btree ("_path");
  DO $$ BEGIN
   ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_local_court_fk" FOREIGN KEY ("local_court_id") REFERENCES "public"."local_court"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_event_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_charity_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charity"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_fundraiser_fk" FOREIGN KEY ("fundraiser_id") REFERENCES "public"."fundraiser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_local_court_fk" FOREIGN KEY ("local_court_id") REFERENCES "public"."local_court"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_event_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_charity_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charity"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_fundraiser_fk" FOREIGN KEY ("fundraiser_id") REFERENCES "public"."fundraiser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "page_rels_local_court_id_idx" ON "page_rels" USING btree ("local_court_id");
  CREATE INDEX IF NOT EXISTS "page_rels_event_id_idx" ON "page_rels" USING btree ("event_id");
  CREATE INDEX IF NOT EXISTS "page_rels_charity_id_idx" ON "page_rels" USING btree ("charity_id");
  CREATE INDEX IF NOT EXISTS "page_rels_fundraiser_id_idx" ON "page_rels" USING btree ("fundraiser_id");
  CREATE INDEX IF NOT EXISTS "page_rels_project_id_idx" ON "page_rels" USING btree ("project_id");
  CREATE INDEX IF NOT EXISTS "_page_v_rels_local_court_id_idx" ON "_page_v_rels" USING btree ("local_court_id");
  CREATE INDEX IF NOT EXISTS "_page_v_rels_event_id_idx" ON "_page_v_rels" USING btree ("event_id");
  CREATE INDEX IF NOT EXISTS "_page_v_rels_charity_id_idx" ON "_page_v_rels" USING btree ("charity_id");
  CREATE INDEX IF NOT EXISTS "_page_v_rels_fundraiser_id_idx" ON "_page_v_rels" USING btree ("fundraiser_id");
  CREATE INDEX IF NOT EXISTS "_page_v_rels_project_id_idx" ON "_page_v_rels" USING btree ("project_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "page_blocks_court_listing_courts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"court_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_court_listing_courts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"court_id" integer,
  	"_uuid" varchar
  );
  
  ALTER TABLE "page_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_archive" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_blocks_archive" CASCADE;
  DROP TABLE "_page_v_blocks_archive" CASCADE;
  ALTER TABLE "page_rels" DROP CONSTRAINT "page_rels_local_court_fk";
  
  ALTER TABLE "page_rels" DROP CONSTRAINT "page_rels_event_fk";
  
  ALTER TABLE "page_rels" DROP CONSTRAINT "page_rels_charity_fk";
  
  ALTER TABLE "page_rels" DROP CONSTRAINT "page_rels_fundraiser_fk";
  
  ALTER TABLE "page_rels" DROP CONSTRAINT "page_rels_project_fk";
  
  ALTER TABLE "_page_v_rels" DROP CONSTRAINT "_page_v_rels_local_court_fk";
  
  ALTER TABLE "_page_v_rels" DROP CONSTRAINT "_page_v_rels_event_fk";
  
  ALTER TABLE "_page_v_rels" DROP CONSTRAINT "_page_v_rels_charity_fk";
  
  ALTER TABLE "_page_v_rels" DROP CONSTRAINT "_page_v_rels_fundraiser_fk";
  
  ALTER TABLE "_page_v_rels" DROP CONSTRAINT "_page_v_rels_project_fk";
  
  DROP INDEX IF EXISTS "page_rels_local_court_id_idx";
  DROP INDEX IF EXISTS "page_rels_event_id_idx";
  DROP INDEX IF EXISTS "page_rels_charity_id_idx";
  DROP INDEX IF EXISTS "page_rels_fundraiser_id_idx";
  DROP INDEX IF EXISTS "page_rels_project_id_idx";
  DROP INDEX IF EXISTS "_page_v_rels_local_court_id_idx";
  DROP INDEX IF EXISTS "_page_v_rels_event_id_idx";
  DROP INDEX IF EXISTS "_page_v_rels_charity_id_idx";
  DROP INDEX IF EXISTS "_page_v_rels_fundraiser_id_idx";
  DROP INDEX IF EXISTS "_page_v_rels_project_id_idx";
  DO $$ BEGIN
   ALTER TABLE "page_blocks_court_listing_courts" ADD CONSTRAINT "page_blocks_court_listing_courts_court_id_local_court_id_fk" FOREIGN KEY ("court_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_court_listing_courts" ADD CONSTRAINT "page_blocks_court_listing_courts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_court_listing"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_court_listing_courts" ADD CONSTRAINT "_page_v_blocks_court_listing_courts_court_id_local_court_id_fk" FOREIGN KEY ("court_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_court_listing_courts" ADD CONSTRAINT "_page_v_blocks_court_listing_courts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_court_listing"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "page_blocks_court_listing_courts_order_idx" ON "page_blocks_court_listing_courts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_court_listing_courts_parent_id_idx" ON "page_blocks_court_listing_courts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "page_blocks_court_listing_courts_court_idx" ON "page_blocks_court_listing_courts" USING btree ("court_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_court_listing_courts_order_idx" ON "_page_v_blocks_court_listing_courts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_court_listing_courts_parent_id_idx" ON "_page_v_blocks_court_listing_courts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_court_listing_courts_court_idx" ON "_page_v_blocks_court_listing_courts" USING btree ("court_id");
  ALTER TABLE "page_rels" DROP COLUMN IF EXISTS "local_court_id";
  ALTER TABLE "page_rels" DROP COLUMN IF EXISTS "event_id";
  ALTER TABLE "page_rels" DROP COLUMN IF EXISTS "charity_id";
  ALTER TABLE "page_rels" DROP COLUMN IF EXISTS "fundraiser_id";
  ALTER TABLE "page_rels" DROP COLUMN IF EXISTS "project_id";
  ALTER TABLE "_page_v_rels" DROP COLUMN IF EXISTS "local_court_id";
  ALTER TABLE "_page_v_rels" DROP COLUMN IF EXISTS "event_id";
  ALTER TABLE "_page_v_rels" DROP COLUMN IF EXISTS "charity_id";
  ALTER TABLE "_page_v_rels" DROP COLUMN IF EXISTS "fundraiser_id";
  ALTER TABLE "_page_v_rels" DROP COLUMN IF EXISTS "project_id";
  DROP TYPE "public"."enum_page_blocks_archive_collection";
  DROP TYPE "public"."enum_page_blocks_archive_type";
  DROP TYPE "public"."enum__page_v_blocks_archive_collection";
  DROP TYPE "public"."enum__page_v_blocks_archive_type";`)
}
