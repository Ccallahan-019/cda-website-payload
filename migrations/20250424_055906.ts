import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "local_court_court_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "local_court_court_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "local_court_court_charities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "local_court_court_fundraisers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_local_court_v_version_court_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_local_court_v_version_court_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_local_court_v_version_court_charities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_local_court_v_version_court_fundraisers" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "local_court_court_events" CASCADE;
  DROP TABLE "local_court_court_projects" CASCADE;
  DROP TABLE "local_court_court_charities" CASCADE;
  DROP TABLE "local_court_court_fundraisers" CASCADE;
  DROP TABLE "_local_court_v_version_court_events" CASCADE;
  DROP TABLE "_local_court_v_version_court_projects" CASCADE;
  DROP TABLE "_local_court_v_version_court_charities" CASCADE;
  DROP TABLE "_local_court_v_version_court_fundraisers" CASCADE;
  ALTER TABLE "event" ADD COLUMN "associated_court_id" integer;
  ALTER TABLE "event" ADD COLUMN "associated_diocese_id" integer;
  ALTER TABLE "_event_v" ADD COLUMN "version_associated_court_id" integer;
  ALTER TABLE "_event_v" ADD COLUMN "version_associated_diocese_id" integer;
  ALTER TABLE "project" ADD COLUMN "associated_court_id" integer;
  ALTER TABLE "_project_v" ADD COLUMN "version_associated_court_id" integer;
  ALTER TABLE "charity" ADD COLUMN "associated_court_id" integer;
  ALTER TABLE "_charity_v" ADD COLUMN "version_associated_court_id" integer;
  ALTER TABLE "fundraiser" ADD COLUMN "associated_court_id" integer;
  ALTER TABLE "_fundraiser_v" ADD COLUMN "version_associated_court_id" integer;
  ALTER TABLE "local_court_rels" ADD COLUMN "event_id" integer;
  ALTER TABLE "local_court_rels" ADD COLUMN "project_id" integer;
  ALTER TABLE "local_court_rels" ADD COLUMN "charity_id" integer;
  ALTER TABLE "local_court_rels" ADD COLUMN "fundraiser_id" integer;
  ALTER TABLE "_local_court_v_rels" ADD COLUMN "event_id" integer;
  ALTER TABLE "_local_court_v_rels" ADD COLUMN "project_id" integer;
  ALTER TABLE "_local_court_v_rels" ADD COLUMN "charity_id" integer;
  ALTER TABLE "_local_court_v_rels" ADD COLUMN "fundraiser_id" integer;
  DO $$ BEGIN
   ALTER TABLE "event" ADD CONSTRAINT "event_associated_court_id_local_court_id_fk" FOREIGN KEY ("associated_court_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "event" ADD CONSTRAINT "event_associated_diocese_id_local_court_id_fk" FOREIGN KEY ("associated_diocese_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_event_v" ADD CONSTRAINT "_event_v_version_associated_court_id_local_court_id_fk" FOREIGN KEY ("version_associated_court_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_event_v" ADD CONSTRAINT "_event_v_version_associated_diocese_id_local_court_id_fk" FOREIGN KEY ("version_associated_diocese_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project" ADD CONSTRAINT "project_associated_court_id_local_court_id_fk" FOREIGN KEY ("associated_court_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_project_v" ADD CONSTRAINT "_project_v_version_associated_court_id_local_court_id_fk" FOREIGN KEY ("version_associated_court_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "charity" ADD CONSTRAINT "charity_associated_court_id_local_court_id_fk" FOREIGN KEY ("associated_court_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_charity_v" ADD CONSTRAINT "_charity_v_version_associated_court_id_local_court_id_fk" FOREIGN KEY ("version_associated_court_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "fundraiser" ADD CONSTRAINT "fundraiser_associated_court_id_local_court_id_fk" FOREIGN KEY ("associated_court_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_fundraiser_v" ADD CONSTRAINT "_fundraiser_v_version_associated_court_id_local_court_id_fk" FOREIGN KEY ("version_associated_court_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_rels" ADD CONSTRAINT "local_court_rels_event_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_rels" ADD CONSTRAINT "local_court_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_rels" ADD CONSTRAINT "local_court_rels_charity_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charity"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_rels" ADD CONSTRAINT "local_court_rels_fundraiser_fk" FOREIGN KEY ("fundraiser_id") REFERENCES "public"."fundraiser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_rels" ADD CONSTRAINT "_local_court_v_rels_event_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_rels" ADD CONSTRAINT "_local_court_v_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_rels" ADD CONSTRAINT "_local_court_v_rels_charity_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charity"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_rels" ADD CONSTRAINT "_local_court_v_rels_fundraiser_fk" FOREIGN KEY ("fundraiser_id") REFERENCES "public"."fundraiser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "event_associated_court_idx" ON "event" USING btree ("associated_court_id");
  CREATE INDEX IF NOT EXISTS "event_associated_diocese_idx" ON "event" USING btree ("associated_diocese_id");
  CREATE INDEX IF NOT EXISTS "_event_v_version_version_associated_court_idx" ON "_event_v" USING btree ("version_associated_court_id");
  CREATE INDEX IF NOT EXISTS "_event_v_version_version_associated_diocese_idx" ON "_event_v" USING btree ("version_associated_diocese_id");
  CREATE INDEX IF NOT EXISTS "project_associated_court_idx" ON "project" USING btree ("associated_court_id");
  CREATE INDEX IF NOT EXISTS "_project_v_version_version_associated_court_idx" ON "_project_v" USING btree ("version_associated_court_id");
  CREATE INDEX IF NOT EXISTS "charity_associated_court_idx" ON "charity" USING btree ("associated_court_id");
  CREATE INDEX IF NOT EXISTS "_charity_v_version_version_associated_court_idx" ON "_charity_v" USING btree ("version_associated_court_id");
  CREATE INDEX IF NOT EXISTS "fundraiser_associated_court_idx" ON "fundraiser" USING btree ("associated_court_id");
  CREATE INDEX IF NOT EXISTS "_fundraiser_v_version_version_associated_court_idx" ON "_fundraiser_v" USING btree ("version_associated_court_id");
  CREATE INDEX IF NOT EXISTS "local_court_rels_event_id_idx" ON "local_court_rels" USING btree ("event_id");
  CREATE INDEX IF NOT EXISTS "local_court_rels_project_id_idx" ON "local_court_rels" USING btree ("project_id");
  CREATE INDEX IF NOT EXISTS "local_court_rels_charity_id_idx" ON "local_court_rels" USING btree ("charity_id");
  CREATE INDEX IF NOT EXISTS "local_court_rels_fundraiser_id_idx" ON "local_court_rels" USING btree ("fundraiser_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_rels_event_id_idx" ON "_local_court_v_rels" USING btree ("event_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_rels_project_id_idx" ON "_local_court_v_rels" USING btree ("project_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_rels_charity_id_idx" ON "_local_court_v_rels" USING btree ("charity_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_rels_fundraiser_id_idx" ON "_local_court_v_rels" USING btree ("fundraiser_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "local_court_court_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"event_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "local_court_court_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "local_court_court_charities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"charity_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "local_court_court_fundraisers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"fundraiser_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_local_court_v_version_court_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_local_court_v_version_court_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_local_court_v_version_court_charities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"charity_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_local_court_v_version_court_fundraisers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"fundraiser_id" integer,
  	"_uuid" varchar
  );
  
  ALTER TABLE "event" DROP CONSTRAINT "event_associated_court_id_local_court_id_fk";
  
  ALTER TABLE "event" DROP CONSTRAINT "event_associated_diocese_id_local_court_id_fk";
  
  ALTER TABLE "_event_v" DROP CONSTRAINT "_event_v_version_associated_court_id_local_court_id_fk";
  
  ALTER TABLE "_event_v" DROP CONSTRAINT "_event_v_version_associated_diocese_id_local_court_id_fk";
  
  ALTER TABLE "project" DROP CONSTRAINT "project_associated_court_id_local_court_id_fk";
  
  ALTER TABLE "_project_v" DROP CONSTRAINT "_project_v_version_associated_court_id_local_court_id_fk";
  
  ALTER TABLE "charity" DROP CONSTRAINT "charity_associated_court_id_local_court_id_fk";
  
  ALTER TABLE "_charity_v" DROP CONSTRAINT "_charity_v_version_associated_court_id_local_court_id_fk";
  
  ALTER TABLE "fundraiser" DROP CONSTRAINT "fundraiser_associated_court_id_local_court_id_fk";
  
  ALTER TABLE "_fundraiser_v" DROP CONSTRAINT "_fundraiser_v_version_associated_court_id_local_court_id_fk";
  
  ALTER TABLE "local_court_rels" DROP CONSTRAINT "local_court_rels_event_fk";
  
  ALTER TABLE "local_court_rels" DROP CONSTRAINT "local_court_rels_project_fk";
  
  ALTER TABLE "local_court_rels" DROP CONSTRAINT "local_court_rels_charity_fk";
  
  ALTER TABLE "local_court_rels" DROP CONSTRAINT "local_court_rels_fundraiser_fk";
  
  ALTER TABLE "_local_court_v_rels" DROP CONSTRAINT "_local_court_v_rels_event_fk";
  
  ALTER TABLE "_local_court_v_rels" DROP CONSTRAINT "_local_court_v_rels_project_fk";
  
  ALTER TABLE "_local_court_v_rels" DROP CONSTRAINT "_local_court_v_rels_charity_fk";
  
  ALTER TABLE "_local_court_v_rels" DROP CONSTRAINT "_local_court_v_rels_fundraiser_fk";
  
  DROP INDEX IF EXISTS "event_associated_court_idx";
  DROP INDEX IF EXISTS "event_associated_diocese_idx";
  DROP INDEX IF EXISTS "_event_v_version_version_associated_court_idx";
  DROP INDEX IF EXISTS "_event_v_version_version_associated_diocese_idx";
  DROP INDEX IF EXISTS "project_associated_court_idx";
  DROP INDEX IF EXISTS "_project_v_version_version_associated_court_idx";
  DROP INDEX IF EXISTS "charity_associated_court_idx";
  DROP INDEX IF EXISTS "_charity_v_version_version_associated_court_idx";
  DROP INDEX IF EXISTS "fundraiser_associated_court_idx";
  DROP INDEX IF EXISTS "_fundraiser_v_version_version_associated_court_idx";
  DROP INDEX IF EXISTS "local_court_rels_event_id_idx";
  DROP INDEX IF EXISTS "local_court_rels_project_id_idx";
  DROP INDEX IF EXISTS "local_court_rels_charity_id_idx";
  DROP INDEX IF EXISTS "local_court_rels_fundraiser_id_idx";
  DROP INDEX IF EXISTS "_local_court_v_rels_event_id_idx";
  DROP INDEX IF EXISTS "_local_court_v_rels_project_id_idx";
  DROP INDEX IF EXISTS "_local_court_v_rels_charity_id_idx";
  DROP INDEX IF EXISTS "_local_court_v_rels_fundraiser_id_idx";
  DO $$ BEGIN
   ALTER TABLE "local_court_court_events" ADD CONSTRAINT "local_court_court_events_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_court_events" ADD CONSTRAINT "local_court_court_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_court"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_court_projects" ADD CONSTRAINT "local_court_court_projects_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_court_projects" ADD CONSTRAINT "local_court_court_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_court"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_court_charities" ADD CONSTRAINT "local_court_court_charities_charity_id_charity_id_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charity"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_court_charities" ADD CONSTRAINT "local_court_court_charities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_court"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_court_fundraisers" ADD CONSTRAINT "local_court_court_fundraisers_fundraiser_id_fundraiser_id_fk" FOREIGN KEY ("fundraiser_id") REFERENCES "public"."fundraiser"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_court_fundraisers" ADD CONSTRAINT "local_court_court_fundraisers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_court"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_version_court_events" ADD CONSTRAINT "_local_court_v_version_court_events_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_version_court_events" ADD CONSTRAINT "_local_court_v_version_court_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_court_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_version_court_projects" ADD CONSTRAINT "_local_court_v_version_court_projects_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_version_court_projects" ADD CONSTRAINT "_local_court_v_version_court_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_court_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_version_court_charities" ADD CONSTRAINT "_local_court_v_version_court_charities_charity_id_charity_id_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charity"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_version_court_charities" ADD CONSTRAINT "_local_court_v_version_court_charities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_court_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_version_court_fundraisers" ADD CONSTRAINT "_local_court_v_version_court_fundraisers_fundraiser_id_fundraiser_id_fk" FOREIGN KEY ("fundraiser_id") REFERENCES "public"."fundraiser"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_version_court_fundraisers" ADD CONSTRAINT "_local_court_v_version_court_fundraisers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_court_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "local_court_court_events_order_idx" ON "local_court_court_events" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "local_court_court_events_parent_id_idx" ON "local_court_court_events" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "local_court_court_events_event_idx" ON "local_court_court_events" USING btree ("event_id");
  CREATE INDEX IF NOT EXISTS "local_court_court_projects_order_idx" ON "local_court_court_projects" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "local_court_court_projects_parent_id_idx" ON "local_court_court_projects" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "local_court_court_projects_project_idx" ON "local_court_court_projects" USING btree ("project_id");
  CREATE INDEX IF NOT EXISTS "local_court_court_charities_order_idx" ON "local_court_court_charities" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "local_court_court_charities_parent_id_idx" ON "local_court_court_charities" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "local_court_court_charities_charity_idx" ON "local_court_court_charities" USING btree ("charity_id");
  CREATE INDEX IF NOT EXISTS "local_court_court_fundraisers_order_idx" ON "local_court_court_fundraisers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "local_court_court_fundraisers_parent_id_idx" ON "local_court_court_fundraisers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "local_court_court_fundraisers_fundraiser_idx" ON "local_court_court_fundraisers" USING btree ("fundraiser_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_events_order_idx" ON "_local_court_v_version_court_events" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_events_parent_id_idx" ON "_local_court_v_version_court_events" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_events_event_idx" ON "_local_court_v_version_court_events" USING btree ("event_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_projects_order_idx" ON "_local_court_v_version_court_projects" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_projects_parent_id_idx" ON "_local_court_v_version_court_projects" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_projects_project_idx" ON "_local_court_v_version_court_projects" USING btree ("project_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_charities_order_idx" ON "_local_court_v_version_court_charities" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_charities_parent_id_idx" ON "_local_court_v_version_court_charities" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_charities_charity_idx" ON "_local_court_v_version_court_charities" USING btree ("charity_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_fundraisers_order_idx" ON "_local_court_v_version_court_fundraisers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_fundraisers_parent_id_idx" ON "_local_court_v_version_court_fundraisers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_fundraisers_fundraiser_idx" ON "_local_court_v_version_court_fundraisers" USING btree ("fundraiser_id");
  ALTER TABLE "event" DROP COLUMN IF EXISTS "associated_court_id";
  ALTER TABLE "event" DROP COLUMN IF EXISTS "associated_diocese_id";
  ALTER TABLE "_event_v" DROP COLUMN IF EXISTS "version_associated_court_id";
  ALTER TABLE "_event_v" DROP COLUMN IF EXISTS "version_associated_diocese_id";
  ALTER TABLE "project" DROP COLUMN IF EXISTS "associated_court_id";
  ALTER TABLE "_project_v" DROP COLUMN IF EXISTS "version_associated_court_id";
  ALTER TABLE "charity" DROP COLUMN IF EXISTS "associated_court_id";
  ALTER TABLE "_charity_v" DROP COLUMN IF EXISTS "version_associated_court_id";
  ALTER TABLE "fundraiser" DROP COLUMN IF EXISTS "associated_court_id";
  ALTER TABLE "_fundraiser_v" DROP COLUMN IF EXISTS "version_associated_court_id";
  ALTER TABLE "local_court_rels" DROP COLUMN IF EXISTS "event_id";
  ALTER TABLE "local_court_rels" DROP COLUMN IF EXISTS "project_id";
  ALTER TABLE "local_court_rels" DROP COLUMN IF EXISTS "charity_id";
  ALTER TABLE "local_court_rels" DROP COLUMN IF EXISTS "fundraiser_id";
  ALTER TABLE "_local_court_v_rels" DROP COLUMN IF EXISTS "event_id";
  ALTER TABLE "_local_court_v_rels" DROP COLUMN IF EXISTS "project_id";
  ALTER TABLE "_local_court_v_rels" DROP COLUMN IF EXISTS "charity_id";
  ALTER TABLE "_local_court_v_rels" DROP COLUMN IF EXISTS "fundraiser_id";`)
}
