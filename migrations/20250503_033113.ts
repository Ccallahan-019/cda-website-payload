import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "page_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "media" ADD COLUMN "caption" jsonb;
  DO $$ BEGIN
   ALTER TABLE "page_blocks_media_block" ADD CONSTRAINT "page_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_media_block" ADD CONSTRAINT "page_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_media_block" ADD CONSTRAINT "_page_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_media_block" ADD CONSTRAINT "_page_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "page_blocks_media_block_order_idx" ON "page_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_media_block_parent_id_idx" ON "page_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_media_block_path_idx" ON "page_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_media_block_media_idx" ON "page_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_media_block_order_idx" ON "_page_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_media_block_parent_id_idx" ON "_page_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_media_block_path_idx" ON "_page_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_media_block_media_idx" ON "_page_v_blocks_media_block" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "page_blocks_media_block" CASCADE;
  DROP TABLE "_page_v_blocks_media_block" CASCADE;
  ALTER TABLE "media" DROP COLUMN IF EXISTS "caption";`)
}
