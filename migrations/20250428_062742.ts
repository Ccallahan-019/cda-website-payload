import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_blocks_court_listing_selection_type" AS ENUM('all', 'diocese', 'manual');
  CREATE TYPE "public"."enum__page_v_blocks_court_listing_selection_type" AS ENUM('all', 'diocese', 'manual');
  ALTER TABLE "page_blocks_court_listing" ADD COLUMN "selection_type" "enum_page_blocks_court_listing_selection_type" DEFAULT 'all';
  ALTER TABLE "page_blocks_court_listing" ADD COLUMN "selected_diocese_id" integer;
  ALTER TABLE "_page_v_blocks_court_listing" ADD COLUMN "selection_type" "enum__page_v_blocks_court_listing_selection_type" DEFAULT 'all';
  ALTER TABLE "_page_v_blocks_court_listing" ADD COLUMN "selected_diocese_id" integer;
  DO $$ BEGIN
   ALTER TABLE "page_blocks_court_listing" ADD CONSTRAINT "page_blocks_court_listing_selected_diocese_id_diocese_id_fk" FOREIGN KEY ("selected_diocese_id") REFERENCES "public"."diocese"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_court_listing" ADD CONSTRAINT "_page_v_blocks_court_listing_selected_diocese_id_diocese_id_fk" FOREIGN KEY ("selected_diocese_id") REFERENCES "public"."diocese"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "page_blocks_court_listing_selected_diocese_idx" ON "page_blocks_court_listing" USING btree ("selected_diocese_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_court_listing_selected_diocese_idx" ON "_page_v_blocks_court_listing" USING btree ("selected_diocese_id");
  ALTER TABLE "page_blocks_archive" DROP COLUMN IF EXISTS "pagination";
  ALTER TABLE "_page_v_blocks_archive" DROP COLUMN IF EXISTS "pagination";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_blocks_court_listing" DROP CONSTRAINT "page_blocks_court_listing_selected_diocese_id_diocese_id_fk";
  
  ALTER TABLE "_page_v_blocks_court_listing" DROP CONSTRAINT "_page_v_blocks_court_listing_selected_diocese_id_diocese_id_fk";
  
  DROP INDEX IF EXISTS "page_blocks_court_listing_selected_diocese_idx";
  DROP INDEX IF EXISTS "_page_v_blocks_court_listing_selected_diocese_idx";
  ALTER TABLE "page_blocks_archive" ADD COLUMN "pagination" boolean DEFAULT true;
  ALTER TABLE "_page_v_blocks_archive" ADD COLUMN "pagination" boolean DEFAULT true;
  ALTER TABLE "page_blocks_court_listing" DROP COLUMN IF EXISTS "selection_type";
  ALTER TABLE "page_blocks_court_listing" DROP COLUMN IF EXISTS "selected_diocese_id";
  ALTER TABLE "_page_v_blocks_court_listing" DROP COLUMN IF EXISTS "selection_type";
  ALTER TABLE "_page_v_blocks_court_listing" DROP COLUMN IF EXISTS "selected_diocese_id";
  DROP TYPE "public"."enum_page_blocks_court_listing_selection_type";
  DROP TYPE "public"."enum__page_v_blocks_court_listing_selection_type";`)
}
