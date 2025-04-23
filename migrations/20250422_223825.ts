import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE IF NOT EXISTS "public"."enum_news_post_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum__news_post_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum_page_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE IF NOT EXISTS "public"."enum_page_hero_links_link_appearance" AS ENUM('default', 'outline', 'ghost', 'destructive', 'link', 'secondary');
  CREATE TYPE IF NOT EXISTS "public"."enum_page_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE IF NOT EXISTS "public"."enum_page_blocks_side_bar_alignment" AS ENUM('left', 'right');
  CREATE TYPE IF NOT EXISTS "public"."enum_page_blocks_media_with_text_media_size" AS ENUM('oneThird', 'half', 'twoThirds');
  CREATE TYPE IF NOT EXISTS "public"."enum_page_blocks_media_with_text_media_alignment" AS ENUM('left', 'right');
  CREATE TYPE IF NOT EXISTS "public"."enum_page_hero_type" AS ENUM('none', 'highImpact', 'lowImpact');
  CREATE TYPE IF NOT EXISTS "public"."enum_page_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum__page_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE IF NOT EXISTS "public"."enum__page_v_version_hero_links_link_appearance" AS ENUM('default', 'outline', 'ghost', 'destructive', 'link', 'secondary');
  CREATE TYPE IF NOT EXISTS "public"."enum__page_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE IF NOT EXISTS "public"."enum__page_v_blocks_side_bar_alignment" AS ENUM('left', 'right');
  CREATE TYPE IF NOT EXISTS "public"."enum__page_v_blocks_media_with_text_media_size" AS ENUM('oneThird', 'half', 'twoThirds');
  CREATE TYPE IF NOT EXISTS "public"."enum__page_v_blocks_media_with_text_media_alignment" AS ENUM('left', 'right');
  CREATE TYPE IF NOT EXISTS "public"."enum__page_v_version_hero_type" AS ENUM('none', 'highImpact', 'lowImpact');
  CREATE TYPE IF NOT EXISTS "public"."enum__page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum_contact_contact_type" AS ENUM('national', 'state', 'local');
  CREATE TYPE IF NOT EXISTS "public"."enum_event_event_type" AS ENUM('national', 'state', 'local', 'diocesan');
  CREATE TYPE IF NOT EXISTS "public"."enum_event_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum__event_v_version_event_type" AS ENUM('national', 'state', 'local', 'diocesan');
  CREATE TYPE IF NOT EXISTS "public"."enum__event_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum_project_project_type" AS ENUM('national', 'state', 'local');
  CREATE TYPE IF NOT EXISTS "public"."enum_project_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum__project_v_version_project_type" AS ENUM('national', 'state', 'local');
  CREATE TYPE IF NOT EXISTS "public"."enum__project_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum_charity_charity_type" AS ENUM('national', 'state', 'local');
  CREATE TYPE IF NOT EXISTS "public"."enum_charity_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum__charity_v_version_charity_type" AS ENUM('national', 'state', 'local');
  CREATE TYPE IF NOT EXISTS "public"."enum__charity_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum_fundraiser_fundraiser_type" AS ENUM('national', 'state', 'local');
  CREATE TYPE IF NOT EXISTS "public"."enum_fundraiser_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum__fundraiser_v_version_fundraiser_type" AS ENUM('national', 'state', 'local');
  CREATE TYPE IF NOT EXISTS "public"."enum__fundraiser_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum_local_court_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum__local_court_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE IF NOT EXISTS "public"."enum_newsletter_type" AS ENUM('local', 'state', 'national');
  CREATE TYPE IF NOT EXISTS "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE IF NOT EXISTS "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE IF NOT EXISTS "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE IF NOT EXISTS "public"."enum_header_nav_items_sub_nav_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE IF NOT EXISTS "public"."enum_header_nav_items_sub_nav_links_link_appearance" AS ENUM('default', 'outline', 'ghost', 'destructive', 'link', 'secondary');
  CREATE TYPE IF NOT EXISTS "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE IF NOT EXISTS "public"."enum_header_nav_items_link_appearance" AS ENUM('default', 'outline', 'ghost', 'destructive', 'link', 'secondary');
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "news_post" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_post_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "news_post_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"news_post_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_news_post_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_post_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_news_post_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"news_post_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "page_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_page_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_page_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_page_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_stats_bar_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stat_number" numeric,
  	"stat_postfix" varchar,
  	"stat_description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_stats_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_side_bar_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"section_rich_text" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_side_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"alignment" "enum_page_blocks_side_bar_alignment" DEFAULT 'right',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_contact_cards_contacts_to_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"contact_to_list_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_contact_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_news_posts_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_news_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"pagination" boolean DEFAULT false,
  	"rows_per_page" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_court_listing_courts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"court_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_court_listing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"rows_per_page" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_calendar_months_month_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_calendar_months" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_calendar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_media_with_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_size" "enum_page_blocks_media_with_text_media_size" DEFAULT 'half',
  	"media_alignment" "enum_page_blocks_media_with_text_media_alignment" DEFAULT 'left',
  	"rich_text" jsonb,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slide_content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_newsletters_newsletters" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"newsletter_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_newsletters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"download_image_id" integer,
  	"dropdown_icon_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_dioceses_accordian" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_page_hero_type" DEFAULT 'lowImpact',
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"hero_include_button" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_page_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"diocese_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__page_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__page_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__page_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_stats_bar_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stat_number" numeric,
  	"stat_postfix" varchar,
  	"stat_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_stats_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_side_bar_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"section_rich_text" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_side_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"alignment" "enum__page_v_blocks_side_bar_alignment" DEFAULT 'right',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_contact_cards_contacts_to_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_to_list_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_contact_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_news_posts_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"post_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_news_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"pagination" boolean DEFAULT false,
  	"rows_per_page" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_court_listing_courts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"court_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_court_listing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"rows_per_page" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_calendar_months_month_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_calendar_months" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_calendar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_media_with_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_size" "enum__page_v_blocks_media_with_text_media_size" DEFAULT 'half',
  	"media_alignment" "enum__page_v_blocks_media_with_text_media_alignment" DEFAULT 'left',
  	"rich_text" jsonb,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"slide_content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_newsletters_newsletters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"newsletter_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_newsletters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"download_image_id" integer,
  	"dropdown_icon_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_dioceses_accordian" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__page_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_hero_include_button" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__page_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"diocese_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "contact_contact_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"role" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_name" varchar NOT NULL,
  	"contact_email" varchar,
  	"contact_image_id" integer,
  	"contact_positions_officer" boolean,
  	"contact_positions_chairman" boolean,
  	"contact_positions_district_deputy" boolean,
  	"contact_type" "enum_contact_contact_type" DEFAULT 'national' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "diocese_district_deputies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"deputy_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "diocese_diocese_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"event_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "diocese" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"diocese_name" varchar NOT NULL,
  	"diocese_website" varchar,
  	"diocese_location_diocese_address" varchar,
  	"diocese_location_diocese_city" varchar,
  	"diocese_location_diocese_state" varchar,
  	"diocese_location_diocese_zipcode" varchar,
  	"diocese_phone_number" varchar,
  	"info" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "event" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_name" varchar,
  	"event_date" timestamp(3) with time zone,
  	"event_description" varchar,
  	"event_type" "enum_event_event_type",
  	"hero_image_id" integer,
  	"content" jsonb,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_event_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "event_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"event_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_event_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_event_name" varchar,
  	"version_event_date" timestamp(3) with time zone,
  	"version_event_description" varchar,
  	"version_event_type" "enum__event_v_version_event_type",
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__event_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_event_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"event_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "project" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_name" varchar,
  	"project_description" varchar,
  	"project_type" "enum_project_project_type",
  	"hero_image_id" integer,
  	"content" jsonb,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_project_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_project_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_project_name" varchar,
  	"version_project_description" varchar,
  	"version_project_type" "enum__project_v_version_project_type",
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__project_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "charity" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"charity_name" varchar,
  	"charity_description" varchar,
  	"charity_type" "enum_charity_charity_type",
  	"hero_image_id" integer,
  	"content" jsonb,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_charity_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_charity_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_charity_name" varchar,
  	"version_charity_description" varchar,
  	"version_charity_type" "enum__charity_v_version_charity_type",
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__charity_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "fundraiser" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"fundraiser_name" varchar,
  	"fundraiser_description" varchar,
  	"fundraiser_type" "enum_fundraiser_fundraiser_type",
  	"hero_image_id" integer,
  	"content" jsonb,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_fundraiser_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_fundraiser_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_fundraiser_name" varchar,
  	"version_fundraiser_description" varchar,
  	"version_fundraiser_type" "enum__fundraiser_v_version_fundraiser_type",
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__fundraiser_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
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
  
  CREATE TABLE IF NOT EXISTS "local_court" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"court_name" varchar,
  	"court_diocese_id" integer,
  	"court_number" numeric,
  	"instituted" timestamp(3) with time zone,
  	"court_website" varchar,
  	"court_location_court_address" varchar,
  	"court_location_court_city" varchar,
  	"court_location_court_state" varchar,
  	"court_location_court_zipcode" varchar,
  	"court_phone_number" varchar,
  	"court_officers_court_regent_id" integer,
  	"court_officers_court_vice_regent_id" integer,
  	"court_officers_court_recording_secretary_id" integer,
  	"court_officers_court_financial_secretary_id" integer,
  	"court_officers_court_treasurer_id" integer,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_local_court_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "local_court_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"newsletter_id" integer
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
  
  CREATE TABLE IF NOT EXISTS "_local_court_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_court_name" varchar,
  	"version_court_diocese_id" integer,
  	"version_court_number" numeric,
  	"version_instituted" timestamp(3) with time zone,
  	"version_court_website" varchar,
  	"version_court_location_court_address" varchar,
  	"version_court_location_court_city" varchar,
  	"version_court_location_court_state" varchar,
  	"version_court_location_court_zipcode" varchar,
  	"version_court_phone_number" varchar,
  	"version_court_officers_court_regent_id" integer,
  	"version_court_officers_court_vice_regent_id" integer,
  	"version_court_officers_court_recording_secretary_id" integer,
  	"version_court_officers_court_financial_secretary_id" integer,
  	"version_court_officers_court_treasurer_id" integer,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__local_court_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_local_court_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"newsletter_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "newsletter" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"year_of_release" numeric NOT NULL,
  	"quarter" varchar,
  	"type" "enum_newsletter_type" DEFAULT 'state' NOT NULL,
  	"reissue_date" timestamp(3) with time zone,
  	"associated_court_id" integer,
  	"display_title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"news_post_id" integer,
  	"users_id" integer,
  	"page_id" integer,
  	"contact_id" integer,
  	"diocese_id" integer,
  	"event_id" integer,
  	"project_id" integer,
  	"charity_id" integer,
  	"fundraiser_id" integer,
  	"local_court_id" integer,
  	"newsletter_id" integer,
  	"payload_jobs_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_form" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email_heading" varchar DEFAULT 'Email' NOT NULL,
  	"contact_name" varchar NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"text" jsonb,
  	"name_label" varchar NOT NULL,
  	"name_placeholder" varchar NOT NULL,
  	"email_label" varchar NOT NULL,
  	"email_placeholder" varchar NOT NULL,
  	"phone_label" varchar NOT NULL,
  	"phone_placeholder" varchar NOT NULL,
  	"message_label" varchar NOT NULL,
  	"message_placeholder" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_social_media_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"links_heading" varchar NOT NULL,
  	"copyright_text" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_sub_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_sub_nav_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_header_nav_items_sub_nav_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_sub_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_header_nav_items_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"menu_icon_id" integer NOT NULL,
  	"close_icon_id" integer NOT NULL,
  	"sub_menu_icon_id" integer NOT NULL,
  	"back_icon_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "background" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_media_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "news_post" ADD CONSTRAINT "news_post_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_post_rels" ADD CONSTRAINT "news_post_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_post_rels" ADD CONSTRAINT "news_post_rels_news_post_fk" FOREIGN KEY ("news_post_id") REFERENCES "public"."news_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_news_post_v" ADD CONSTRAINT "_news_post_v_parent_id_news_post_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news_post"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_news_post_v" ADD CONSTRAINT "_news_post_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_news_post_v_rels" ADD CONSTRAINT "_news_post_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_post_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_news_post_v_rels" ADD CONSTRAINT "_news_post_v_rels_news_post_fk" FOREIGN KEY ("news_post_id") REFERENCES "public"."news_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_hero_links" ADD CONSTRAINT "page_hero_links_link_reference_id_page_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_hero_links" ADD CONSTRAINT "page_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_content_columns" ADD CONSTRAINT "page_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_content" ADD CONSTRAINT "page_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_stats_bar_stats" ADD CONSTRAINT "page_blocks_stats_bar_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_stats_bar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_stats_bar" ADD CONSTRAINT "page_blocks_stats_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_side_bar_sections" ADD CONSTRAINT "page_blocks_side_bar_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_side_bar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_side_bar" ADD CONSTRAINT "page_blocks_side_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_contact_cards_contacts_to_list" ADD CONSTRAINT "page_blocks_contact_cards_contacts_to_list_contact_to_list_id_contact_id_fk" FOREIGN KEY ("contact_to_list_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_contact_cards_contacts_to_list" ADD CONSTRAINT "page_blocks_contact_cards_contacts_to_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_contact_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_contact_cards" ADD CONSTRAINT "page_blocks_contact_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_tabs_tabs" ADD CONSTRAINT "page_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_tabs" ADD CONSTRAINT "page_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_news_posts_posts" ADD CONSTRAINT "page_blocks_news_posts_posts_post_id_news_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."news_post"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_news_posts_posts" ADD CONSTRAINT "page_blocks_news_posts_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_news_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_news_posts" ADD CONSTRAINT "page_blocks_news_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
   ALTER TABLE "page_blocks_court_listing" ADD CONSTRAINT "page_blocks_court_listing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_calendar_months_month_items" ADD CONSTRAINT "page_blocks_calendar_months_month_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_calendar_months"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_calendar_months" ADD CONSTRAINT "page_blocks_calendar_months_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_calendar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_calendar" ADD CONSTRAINT "page_blocks_calendar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_media_with_text" ADD CONSTRAINT "page_blocks_media_with_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_media_with_text" ADD CONSTRAINT "page_blocks_media_with_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_slider_slides" ADD CONSTRAINT "page_blocks_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_slider" ADD CONSTRAINT "page_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_newsletters_newsletters" ADD CONSTRAINT "page_blocks_newsletters_newsletters_newsletter_id_newsletter_id_fk" FOREIGN KEY ("newsletter_id") REFERENCES "public"."newsletter"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_newsletters_newsletters" ADD CONSTRAINT "page_blocks_newsletters_newsletters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_newsletters"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_newsletters" ADD CONSTRAINT "page_blocks_newsletters_download_image_id_media_id_fk" FOREIGN KEY ("download_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_newsletters" ADD CONSTRAINT "page_blocks_newsletters_dropdown_icon_id_media_id_fk" FOREIGN KEY ("dropdown_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_newsletters" ADD CONSTRAINT "page_blocks_newsletters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_blocks_dioceses_accordian" ADD CONSTRAINT "page_blocks_dioceses_accordian_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page" ADD CONSTRAINT "page_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_diocese_fk" FOREIGN KEY ("diocese_id") REFERENCES "public"."diocese"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_version_hero_links" ADD CONSTRAINT "_page_v_version_hero_links_link_reference_id_page_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_version_hero_links" ADD CONSTRAINT "_page_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_content_columns" ADD CONSTRAINT "_page_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_content" ADD CONSTRAINT "_page_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_stats_bar_stats" ADD CONSTRAINT "_page_v_blocks_stats_bar_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_stats_bar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_stats_bar" ADD CONSTRAINT "_page_v_blocks_stats_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_side_bar_sections" ADD CONSTRAINT "_page_v_blocks_side_bar_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_side_bar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_side_bar" ADD CONSTRAINT "_page_v_blocks_side_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_contact_cards_contacts_to_list" ADD CONSTRAINT "_page_v_blocks_contact_cards_contacts_to_list_contact_to_list_id_contact_id_fk" FOREIGN KEY ("contact_to_list_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_contact_cards_contacts_to_list" ADD CONSTRAINT "_page_v_blocks_contact_cards_contacts_to_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_contact_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_contact_cards" ADD CONSTRAINT "_page_v_blocks_contact_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_tabs_tabs" ADD CONSTRAINT "_page_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_tabs" ADD CONSTRAINT "_page_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_news_posts_posts" ADD CONSTRAINT "_page_v_blocks_news_posts_posts_post_id_news_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."news_post"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_news_posts_posts" ADD CONSTRAINT "_page_v_blocks_news_posts_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_news_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_news_posts" ADD CONSTRAINT "_page_v_blocks_news_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
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
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_court_listing" ADD CONSTRAINT "_page_v_blocks_court_listing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_calendar_months_month_items" ADD CONSTRAINT "_page_v_blocks_calendar_months_month_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_calendar_months"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_calendar_months" ADD CONSTRAINT "_page_v_blocks_calendar_months_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_calendar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_calendar" ADD CONSTRAINT "_page_v_blocks_calendar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_media_with_text" ADD CONSTRAINT "_page_v_blocks_media_with_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_media_with_text" ADD CONSTRAINT "_page_v_blocks_media_with_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_slider_slides" ADD CONSTRAINT "_page_v_blocks_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_slider" ADD CONSTRAINT "_page_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_newsletters_newsletters" ADD CONSTRAINT "_page_v_blocks_newsletters_newsletters_newsletter_id_newsletter_id_fk" FOREIGN KEY ("newsletter_id") REFERENCES "public"."newsletter"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_newsletters_newsletters" ADD CONSTRAINT "_page_v_blocks_newsletters_newsletters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_newsletters"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_newsletters" ADD CONSTRAINT "_page_v_blocks_newsletters_download_image_id_media_id_fk" FOREIGN KEY ("download_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_newsletters" ADD CONSTRAINT "_page_v_blocks_newsletters_dropdown_icon_id_media_id_fk" FOREIGN KEY ("dropdown_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_newsletters" ADD CONSTRAINT "_page_v_blocks_newsletters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_blocks_dioceses_accordian" ADD CONSTRAINT "_page_v_blocks_dioceses_accordian_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_parent_id_page_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_diocese_fk" FOREIGN KEY ("diocese_id") REFERENCES "public"."diocese"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_contact_roles" ADD CONSTRAINT "contact_contact_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact" ADD CONSTRAINT "contact_contact_image_id_media_id_fk" FOREIGN KEY ("contact_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "diocese_district_deputies" ADD CONSTRAINT "diocese_district_deputies_deputy_id_contact_id_fk" FOREIGN KEY ("deputy_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "diocese_district_deputies" ADD CONSTRAINT "diocese_district_deputies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diocese"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "diocese_diocese_events" ADD CONSTRAINT "diocese_diocese_events_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "diocese_diocese_events" ADD CONSTRAINT "diocese_diocese_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diocese"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "event" ADD CONSTRAINT "event_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "event_rels" ADD CONSTRAINT "event_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "event_rels" ADD CONSTRAINT "event_rels_event_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_event_v" ADD CONSTRAINT "_event_v_parent_id_event_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."event"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_event_v" ADD CONSTRAINT "_event_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_event_v_rels" ADD CONSTRAINT "_event_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_event_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_event_v_rels" ADD CONSTRAINT "_event_v_rels_event_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project" ADD CONSTRAINT "project_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_project_v" ADD CONSTRAINT "_project_v_parent_id_project_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."project"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_project_v" ADD CONSTRAINT "_project_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "charity" ADD CONSTRAINT "charity_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_charity_v" ADD CONSTRAINT "_charity_v_parent_id_charity_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."charity"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_charity_v" ADD CONSTRAINT "_charity_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "fundraiser" ADD CONSTRAINT "fundraiser_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_fundraiser_v" ADD CONSTRAINT "_fundraiser_v_parent_id_fundraiser_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."fundraiser"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_fundraiser_v" ADD CONSTRAINT "_fundraiser_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
   ALTER TABLE "local_court" ADD CONSTRAINT "local_court_court_diocese_id_diocese_id_fk" FOREIGN KEY ("court_diocese_id") REFERENCES "public"."diocese"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court" ADD CONSTRAINT "local_court_court_officers_court_regent_id_contact_id_fk" FOREIGN KEY ("court_officers_court_regent_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court" ADD CONSTRAINT "local_court_court_officers_court_vice_regent_id_contact_id_fk" FOREIGN KEY ("court_officers_court_vice_regent_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court" ADD CONSTRAINT "local_court_court_officers_court_recording_secretary_id_contact_id_fk" FOREIGN KEY ("court_officers_court_recording_secretary_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court" ADD CONSTRAINT "local_court_court_officers_court_financial_secretary_id_contact_id_fk" FOREIGN KEY ("court_officers_court_financial_secretary_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court" ADD CONSTRAINT "local_court_court_officers_court_treasurer_id_contact_id_fk" FOREIGN KEY ("court_officers_court_treasurer_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court" ADD CONSTRAINT "local_court_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_rels" ADD CONSTRAINT "local_court_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."local_court"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "local_court_rels" ADD CONSTRAINT "local_court_rels_newsletter_fk" FOREIGN KEY ("newsletter_id") REFERENCES "public"."newsletter"("id") ON DELETE cascade ON UPDATE no action;
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
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v" ADD CONSTRAINT "_local_court_v_parent_id_local_court_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v" ADD CONSTRAINT "_local_court_v_version_court_diocese_id_diocese_id_fk" FOREIGN KEY ("version_court_diocese_id") REFERENCES "public"."diocese"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v" ADD CONSTRAINT "_local_court_v_version_court_officers_court_regent_id_contact_id_fk" FOREIGN KEY ("version_court_officers_court_regent_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v" ADD CONSTRAINT "_local_court_v_version_court_officers_court_vice_regent_id_contact_id_fk" FOREIGN KEY ("version_court_officers_court_vice_regent_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v" ADD CONSTRAINT "_local_court_v_version_court_officers_court_recording_secretary_id_contact_id_fk" FOREIGN KEY ("version_court_officers_court_recording_secretary_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v" ADD CONSTRAINT "_local_court_v_version_court_officers_court_financial_secretary_id_contact_id_fk" FOREIGN KEY ("version_court_officers_court_financial_secretary_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v" ADD CONSTRAINT "_local_court_v_version_court_officers_court_treasurer_id_contact_id_fk" FOREIGN KEY ("version_court_officers_court_treasurer_id") REFERENCES "public"."contact"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v" ADD CONSTRAINT "_local_court_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_rels" ADD CONSTRAINT "_local_court_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_local_court_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_local_court_v_rels" ADD CONSTRAINT "_local_court_v_rels_newsletter_fk" FOREIGN KEY ("newsletter_id") REFERENCES "public"."newsletter"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "newsletter" ADD CONSTRAINT "newsletter_associated_court_id_local_court_id_fk" FOREIGN KEY ("associated_court_id") REFERENCES "public"."local_court"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_post_fk" FOREIGN KEY ("news_post_id") REFERENCES "public"."news_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_diocese_fk" FOREIGN KEY ("diocese_id") REFERENCES "public"."diocese"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_charity_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charity"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_fundraiser_fk" FOREIGN KEY ("fundraiser_id") REFERENCES "public"."fundraiser"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_local_court_fk" FOREIGN KEY ("local_court_id") REFERENCES "public"."local_court"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_fk" FOREIGN KEY ("newsletter_id") REFERENCES "public"."newsletter"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_social_media_icons" ADD CONSTRAINT "footer_social_media_icons_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_social_media_icons" ADD CONSTRAINT "footer_social_media_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links_link_id_page_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_sub_nav_links" ADD CONSTRAINT "header_nav_items_sub_nav_links_link_reference_id_page_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_sub_nav_links" ADD CONSTRAINT "header_nav_items_sub_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_sub_nav"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_sub_nav" ADD CONSTRAINT "header_nav_items_sub_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_reference_id_page_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header" ADD CONSTRAINT "header_menu_icon_id_media_id_fk" FOREIGN KEY ("menu_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header" ADD CONSTRAINT "header_close_icon_id_media_id_fk" FOREIGN KEY ("close_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header" ADD CONSTRAINT "header_sub_menu_icon_id_media_id_fk" FOREIGN KEY ("sub_menu_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header" ADD CONSTRAINT "header_back_icon_id_media_id_fk" FOREIGN KEY ("back_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "background" ADD CONSTRAINT "background_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "news_post_hero_image_idx" ON "news_post" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "news_post_slug_idx" ON "news_post" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "news_post_updated_at_idx" ON "news_post" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "news_post_created_at_idx" ON "news_post" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "news_post__status_idx" ON "news_post" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "news_post_rels_order_idx" ON "news_post_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "news_post_rels_parent_idx" ON "news_post_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "news_post_rels_path_idx" ON "news_post_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "news_post_rels_news_post_id_idx" ON "news_post_rels" USING btree ("news_post_id");
  CREATE INDEX IF NOT EXISTS "_news_post_v_parent_idx" ON "_news_post_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_news_post_v_version_version_hero_image_idx" ON "_news_post_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_news_post_v_version_version_slug_idx" ON "_news_post_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_news_post_v_version_version_updated_at_idx" ON "_news_post_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_news_post_v_version_version_created_at_idx" ON "_news_post_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_news_post_v_version_version__status_idx" ON "_news_post_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_news_post_v_created_at_idx" ON "_news_post_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_news_post_v_updated_at_idx" ON "_news_post_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_news_post_v_latest_idx" ON "_news_post_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_news_post_v_autosave_idx" ON "_news_post_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_news_post_v_rels_order_idx" ON "_news_post_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_news_post_v_rels_parent_idx" ON "_news_post_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_news_post_v_rels_path_idx" ON "_news_post_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_news_post_v_rels_news_post_id_idx" ON "_news_post_v_rels" USING btree ("news_post_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "page_hero_links_order_idx" ON "page_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_hero_links_parent_id_idx" ON "page_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_hero_links_link_link_reference_idx" ON "page_hero_links" USING btree ("link_reference_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_content_columns_order_idx" ON "page_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_content_columns_parent_id_idx" ON "page_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_content_order_idx" ON "page_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_content_parent_id_idx" ON "page_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_content_path_idx" ON "page_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_stats_bar_stats_order_idx" ON "page_blocks_stats_bar_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_stats_bar_stats_parent_id_idx" ON "page_blocks_stats_bar_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_stats_bar_order_idx" ON "page_blocks_stats_bar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_stats_bar_parent_id_idx" ON "page_blocks_stats_bar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_stats_bar_path_idx" ON "page_blocks_stats_bar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_side_bar_sections_order_idx" ON "page_blocks_side_bar_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_side_bar_sections_parent_id_idx" ON "page_blocks_side_bar_sections" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_side_bar_order_idx" ON "page_blocks_side_bar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_side_bar_parent_id_idx" ON "page_blocks_side_bar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_side_bar_path_idx" ON "page_blocks_side_bar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_contact_cards_contacts_to_list_order_idx" ON "page_blocks_contact_cards_contacts_to_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_contact_cards_contacts_to_list_parent_id_idx" ON "page_blocks_contact_cards_contacts_to_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_contact_cards_contacts_to_list_contact_to_list_idx" ON "page_blocks_contact_cards_contacts_to_list" USING btree ("contact_to_list_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_contact_cards_order_idx" ON "page_blocks_contact_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_contact_cards_parent_id_idx" ON "page_blocks_contact_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_contact_cards_path_idx" ON "page_blocks_contact_cards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_tabs_tabs_order_idx" ON "page_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_tabs_tabs_parent_id_idx" ON "page_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_tabs_order_idx" ON "page_blocks_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_tabs_parent_id_idx" ON "page_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_tabs_path_idx" ON "page_blocks_tabs" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_news_posts_posts_order_idx" ON "page_blocks_news_posts_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_news_posts_posts_parent_id_idx" ON "page_blocks_news_posts_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_news_posts_posts_post_idx" ON "page_blocks_news_posts_posts" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_news_posts_order_idx" ON "page_blocks_news_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_news_posts_parent_id_idx" ON "page_blocks_news_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_news_posts_path_idx" ON "page_blocks_news_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_court_listing_courts_order_idx" ON "page_blocks_court_listing_courts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_court_listing_courts_parent_id_idx" ON "page_blocks_court_listing_courts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "page_blocks_court_listing_courts_court_idx" ON "page_blocks_court_listing_courts" USING btree ("court_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_court_listing_order_idx" ON "page_blocks_court_listing" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_court_listing_parent_id_idx" ON "page_blocks_court_listing" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_court_listing_path_idx" ON "page_blocks_court_listing" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_calendar_months_month_items_order_idx" ON "page_blocks_calendar_months_month_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_calendar_months_month_items_parent_id_idx" ON "page_blocks_calendar_months_month_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_calendar_months_order_idx" ON "page_blocks_calendar_months" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_calendar_months_parent_id_idx" ON "page_blocks_calendar_months" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_calendar_order_idx" ON "page_blocks_calendar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_calendar_parent_id_idx" ON "page_blocks_calendar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_calendar_path_idx" ON "page_blocks_calendar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_media_with_text_order_idx" ON "page_blocks_media_with_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_media_with_text_parent_id_idx" ON "page_blocks_media_with_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_media_with_text_path_idx" ON "page_blocks_media_with_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_media_with_text_media_idx" ON "page_blocks_media_with_text" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_slider_slides_order_idx" ON "page_blocks_slider_slides" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_slider_slides_parent_id_idx" ON "page_blocks_slider_slides" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_slider_order_idx" ON "page_blocks_slider" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_slider_parent_id_idx" ON "page_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_slider_path_idx" ON "page_blocks_slider" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_newsletters_newsletters_order_idx" ON "page_blocks_newsletters_newsletters" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_newsletters_newsletters_parent_id_idx" ON "page_blocks_newsletters_newsletters" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_newsletters_newsletters_newsletter_idx" ON "page_blocks_newsletters_newsletters" USING btree ("newsletter_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_newsletters_order_idx" ON "page_blocks_newsletters" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_newsletters_parent_id_idx" ON "page_blocks_newsletters" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_newsletters_path_idx" ON "page_blocks_newsletters" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_newsletters_download_image_idx" ON "page_blocks_newsletters" USING btree ("download_image_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_newsletters_dropdown_icon_idx" ON "page_blocks_newsletters" USING btree ("dropdown_icon_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_dioceses_accordian_order_idx" ON "page_blocks_dioceses_accordian" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_dioceses_accordian_parent_id_idx" ON "page_blocks_dioceses_accordian" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_dioceses_accordian_path_idx" ON "page_blocks_dioceses_accordian" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_hero_hero_media_idx" ON "page" USING btree ("hero_media_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "page_slug_idx" ON "page" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "page_updated_at_idx" ON "page" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "page_created_at_idx" ON "page" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "page__status_idx" ON "page" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "page_rels_order_idx" ON "page_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "page_rels_parent_idx" ON "page_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "page_rels_path_idx" ON "page_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "page_rels_diocese_id_idx" ON "page_rels" USING btree ("diocese_id");
  CREATE INDEX IF NOT EXISTS "_page_v_version_hero_links_order_idx" ON "_page_v_version_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_version_hero_links_parent_id_idx" ON "_page_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_version_hero_links_link_link_reference_idx" ON "_page_v_version_hero_links" USING btree ("link_reference_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_content_columns_order_idx" ON "_page_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_content_columns_parent_id_idx" ON "_page_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_content_order_idx" ON "_page_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_content_parent_id_idx" ON "_page_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_content_path_idx" ON "_page_v_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_stats_bar_stats_order_idx" ON "_page_v_blocks_stats_bar_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_stats_bar_stats_parent_id_idx" ON "_page_v_blocks_stats_bar_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_stats_bar_order_idx" ON "_page_v_blocks_stats_bar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_stats_bar_parent_id_idx" ON "_page_v_blocks_stats_bar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_stats_bar_path_idx" ON "_page_v_blocks_stats_bar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_side_bar_sections_order_idx" ON "_page_v_blocks_side_bar_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_side_bar_sections_parent_id_idx" ON "_page_v_blocks_side_bar_sections" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_side_bar_order_idx" ON "_page_v_blocks_side_bar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_side_bar_parent_id_idx" ON "_page_v_blocks_side_bar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_side_bar_path_idx" ON "_page_v_blocks_side_bar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_contact_cards_contacts_to_list_order_idx" ON "_page_v_blocks_contact_cards_contacts_to_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_contact_cards_contacts_to_list_parent_id_idx" ON "_page_v_blocks_contact_cards_contacts_to_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_contact_cards_contacts_to_list_contact_to_list_idx" ON "_page_v_blocks_contact_cards_contacts_to_list" USING btree ("contact_to_list_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_contact_cards_order_idx" ON "_page_v_blocks_contact_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_contact_cards_parent_id_idx" ON "_page_v_blocks_contact_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_contact_cards_path_idx" ON "_page_v_blocks_contact_cards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_tabs_tabs_order_idx" ON "_page_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_tabs_tabs_parent_id_idx" ON "_page_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_tabs_order_idx" ON "_page_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_tabs_parent_id_idx" ON "_page_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_tabs_path_idx" ON "_page_v_blocks_tabs" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_news_posts_posts_order_idx" ON "_page_v_blocks_news_posts_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_news_posts_posts_parent_id_idx" ON "_page_v_blocks_news_posts_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_news_posts_posts_post_idx" ON "_page_v_blocks_news_posts_posts" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_news_posts_order_idx" ON "_page_v_blocks_news_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_news_posts_parent_id_idx" ON "_page_v_blocks_news_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_news_posts_path_idx" ON "_page_v_blocks_news_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_court_listing_courts_order_idx" ON "_page_v_blocks_court_listing_courts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_court_listing_courts_parent_id_idx" ON "_page_v_blocks_court_listing_courts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_court_listing_courts_court_idx" ON "_page_v_blocks_court_listing_courts" USING btree ("court_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_court_listing_order_idx" ON "_page_v_blocks_court_listing" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_court_listing_parent_id_idx" ON "_page_v_blocks_court_listing" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_court_listing_path_idx" ON "_page_v_blocks_court_listing" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_calendar_months_month_items_order_idx" ON "_page_v_blocks_calendar_months_month_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_calendar_months_month_items_parent_id_idx" ON "_page_v_blocks_calendar_months_month_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_calendar_months_order_idx" ON "_page_v_blocks_calendar_months" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_calendar_months_parent_id_idx" ON "_page_v_blocks_calendar_months" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_calendar_order_idx" ON "_page_v_blocks_calendar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_calendar_parent_id_idx" ON "_page_v_blocks_calendar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_calendar_path_idx" ON "_page_v_blocks_calendar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_media_with_text_order_idx" ON "_page_v_blocks_media_with_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_media_with_text_parent_id_idx" ON "_page_v_blocks_media_with_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_media_with_text_path_idx" ON "_page_v_blocks_media_with_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_media_with_text_media_idx" ON "_page_v_blocks_media_with_text" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_slider_slides_order_idx" ON "_page_v_blocks_slider_slides" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_slider_slides_parent_id_idx" ON "_page_v_blocks_slider_slides" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_slider_order_idx" ON "_page_v_blocks_slider" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_slider_parent_id_idx" ON "_page_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_slider_path_idx" ON "_page_v_blocks_slider" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_newsletters_newsletters_order_idx" ON "_page_v_blocks_newsletters_newsletters" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_newsletters_newsletters_parent_id_idx" ON "_page_v_blocks_newsletters_newsletters" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_newsletters_newsletters_newsletter_idx" ON "_page_v_blocks_newsletters_newsletters" USING btree ("newsletter_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_newsletters_order_idx" ON "_page_v_blocks_newsletters" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_newsletters_parent_id_idx" ON "_page_v_blocks_newsletters" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_newsletters_path_idx" ON "_page_v_blocks_newsletters" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_newsletters_download_image_idx" ON "_page_v_blocks_newsletters" USING btree ("download_image_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_newsletters_dropdown_icon_idx" ON "_page_v_blocks_newsletters" USING btree ("dropdown_icon_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_dioceses_accordian_order_idx" ON "_page_v_blocks_dioceses_accordian" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_dioceses_accordian_parent_id_idx" ON "_page_v_blocks_dioceses_accordian" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_dioceses_accordian_path_idx" ON "_page_v_blocks_dioceses_accordian" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_parent_idx" ON "_page_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_version_hero_version_hero_media_idx" ON "_page_v" USING btree ("version_hero_media_id");
  CREATE INDEX IF NOT EXISTS "_page_v_version_version_slug_idx" ON "_page_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_page_v_version_version_updated_at_idx" ON "_page_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_page_v_version_version_created_at_idx" ON "_page_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_page_v_version_version__status_idx" ON "_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_page_v_created_at_idx" ON "_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_page_v_updated_at_idx" ON "_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_page_v_latest_idx" ON "_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_page_v_autosave_idx" ON "_page_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_page_v_rels_order_idx" ON "_page_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_page_v_rels_parent_idx" ON "_page_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_rels_path_idx" ON "_page_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_page_v_rels_diocese_id_idx" ON "_page_v_rels" USING btree ("diocese_id");
  CREATE INDEX IF NOT EXISTS "contact_contact_roles_order_idx" ON "contact_contact_roles" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_contact_roles_parent_id_idx" ON "contact_contact_roles" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_contact_image_idx" ON "contact" USING btree ("contact_image_id");
  CREATE INDEX IF NOT EXISTS "contact_updated_at_idx" ON "contact" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "contact_created_at_idx" ON "contact" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "diocese_district_deputies_order_idx" ON "diocese_district_deputies" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "diocese_district_deputies_parent_id_idx" ON "diocese_district_deputies" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "diocese_district_deputies_deputy_idx" ON "diocese_district_deputies" USING btree ("deputy_id");
  CREATE INDEX IF NOT EXISTS "diocese_diocese_events_order_idx" ON "diocese_diocese_events" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "diocese_diocese_events_parent_id_idx" ON "diocese_diocese_events" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "diocese_diocese_events_event_idx" ON "diocese_diocese_events" USING btree ("event_id");
  CREATE INDEX IF NOT EXISTS "diocese_updated_at_idx" ON "diocese" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "diocese_created_at_idx" ON "diocese" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "event_hero_image_idx" ON "event" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "event_slug_idx" ON "event" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "event_updated_at_idx" ON "event" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "event_created_at_idx" ON "event" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "event__status_idx" ON "event" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "event_rels_order_idx" ON "event_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "event_rels_parent_idx" ON "event_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "event_rels_path_idx" ON "event_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "event_rels_event_id_idx" ON "event_rels" USING btree ("event_id");
  CREATE INDEX IF NOT EXISTS "_event_v_parent_idx" ON "_event_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_event_v_version_version_hero_image_idx" ON "_event_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_event_v_version_version_slug_idx" ON "_event_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_event_v_version_version_updated_at_idx" ON "_event_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_event_v_version_version_created_at_idx" ON "_event_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_event_v_version_version__status_idx" ON "_event_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_event_v_created_at_idx" ON "_event_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_event_v_updated_at_idx" ON "_event_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_event_v_latest_idx" ON "_event_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_event_v_autosave_idx" ON "_event_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_event_v_rels_order_idx" ON "_event_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_event_v_rels_parent_idx" ON "_event_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_event_v_rels_path_idx" ON "_event_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_event_v_rels_event_id_idx" ON "_event_v_rels" USING btree ("event_id");
  CREATE INDEX IF NOT EXISTS "project_hero_image_idx" ON "project" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "project_slug_idx" ON "project" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "project_updated_at_idx" ON "project" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "project_created_at_idx" ON "project" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "project__status_idx" ON "project" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_project_v_parent_idx" ON "_project_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_project_v_version_version_hero_image_idx" ON "_project_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_project_v_version_version_slug_idx" ON "_project_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_project_v_version_version_updated_at_idx" ON "_project_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_project_v_version_version_created_at_idx" ON "_project_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_project_v_version_version__status_idx" ON "_project_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_project_v_created_at_idx" ON "_project_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_project_v_updated_at_idx" ON "_project_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_project_v_latest_idx" ON "_project_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_project_v_autosave_idx" ON "_project_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "charity_hero_image_idx" ON "charity" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "charity_slug_idx" ON "charity" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "charity_updated_at_idx" ON "charity" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "charity_created_at_idx" ON "charity" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "charity__status_idx" ON "charity" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_charity_v_parent_idx" ON "_charity_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_charity_v_version_version_hero_image_idx" ON "_charity_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_charity_v_version_version_slug_idx" ON "_charity_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_charity_v_version_version_updated_at_idx" ON "_charity_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_charity_v_version_version_created_at_idx" ON "_charity_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_charity_v_version_version__status_idx" ON "_charity_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_charity_v_created_at_idx" ON "_charity_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_charity_v_updated_at_idx" ON "_charity_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_charity_v_latest_idx" ON "_charity_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_charity_v_autosave_idx" ON "_charity_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "fundraiser_hero_image_idx" ON "fundraiser" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "fundraiser_slug_idx" ON "fundraiser" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "fundraiser_updated_at_idx" ON "fundraiser" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "fundraiser_created_at_idx" ON "fundraiser" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "fundraiser__status_idx" ON "fundraiser" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_fundraiser_v_parent_idx" ON "_fundraiser_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_fundraiser_v_version_version_hero_image_idx" ON "_fundraiser_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_fundraiser_v_version_version_slug_idx" ON "_fundraiser_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_fundraiser_v_version_version_updated_at_idx" ON "_fundraiser_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_fundraiser_v_version_version_created_at_idx" ON "_fundraiser_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_fundraiser_v_version_version__status_idx" ON "_fundraiser_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_fundraiser_v_created_at_idx" ON "_fundraiser_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_fundraiser_v_updated_at_idx" ON "_fundraiser_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_fundraiser_v_latest_idx" ON "_fundraiser_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_fundraiser_v_autosave_idx" ON "_fundraiser_v" USING btree ("autosave");
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
  CREATE INDEX IF NOT EXISTS "local_court_court_diocese_idx" ON "local_court" USING btree ("court_diocese_id");
  CREATE INDEX IF NOT EXISTS "local_court_court_officers_court_officers_court_regent_idx" ON "local_court" USING btree ("court_officers_court_regent_id");
  CREATE INDEX IF NOT EXISTS "local_court_court_officers_court_officers_court_vice_regent_idx" ON "local_court" USING btree ("court_officers_court_vice_regent_id");
  CREATE INDEX IF NOT EXISTS "local_court_court_officers_court_officers_court_recording_secretary_idx" ON "local_court" USING btree ("court_officers_court_recording_secretary_id");
  CREATE INDEX IF NOT EXISTS "local_court_court_officers_court_officers_court_financial_secretary_idx" ON "local_court" USING btree ("court_officers_court_financial_secretary_id");
  CREATE INDEX IF NOT EXISTS "local_court_court_officers_court_officers_court_treasurer_idx" ON "local_court" USING btree ("court_officers_court_treasurer_id");
  CREATE INDEX IF NOT EXISTS "local_court_hero_image_idx" ON "local_court" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "local_court_updated_at_idx" ON "local_court" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "local_court_created_at_idx" ON "local_court" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "local_court__status_idx" ON "local_court" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "local_court_rels_order_idx" ON "local_court_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "local_court_rels_parent_idx" ON "local_court_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "local_court_rels_path_idx" ON "local_court_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "local_court_rels_newsletter_id_idx" ON "local_court_rels" USING btree ("newsletter_id");
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
  CREATE INDEX IF NOT EXISTS "_local_court_v_parent_idx" ON "_local_court_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_version_court_diocese_idx" ON "_local_court_v" USING btree ("version_court_diocese_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_officers_version_court_officers_court_regent_idx" ON "_local_court_v" USING btree ("version_court_officers_court_regent_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_officers_version_court_officers_court_vice_regent_idx" ON "_local_court_v" USING btree ("version_court_officers_court_vice_regent_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_officers_version_court_officers_court_recording_secretary_idx" ON "_local_court_v" USING btree ("version_court_officers_court_recording_secretary_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_officers_version_court_officers_court_financial_secretary_idx" ON "_local_court_v" USING btree ("version_court_officers_court_financial_secretary_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_court_officers_version_court_officers_court_treasurer_idx" ON "_local_court_v" USING btree ("version_court_officers_court_treasurer_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_version_hero_image_idx" ON "_local_court_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_version_updated_at_idx" ON "_local_court_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_version_created_at_idx" ON "_local_court_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_local_court_v_version_version__status_idx" ON "_local_court_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_local_court_v_created_at_idx" ON "_local_court_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_local_court_v_updated_at_idx" ON "_local_court_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_local_court_v_latest_idx" ON "_local_court_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_local_court_v_autosave_idx" ON "_local_court_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_local_court_v_rels_order_idx" ON "_local_court_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_local_court_v_rels_parent_idx" ON "_local_court_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_local_court_v_rels_path_idx" ON "_local_court_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_local_court_v_rels_newsletter_id_idx" ON "_local_court_v_rels" USING btree ("newsletter_id");
  CREATE INDEX IF NOT EXISTS "newsletter_associated_court_idx" ON "newsletter" USING btree ("associated_court_id");
  CREATE INDEX IF NOT EXISTS "newsletter_updated_at_idx" ON "newsletter" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "newsletter_created_at_idx" ON "newsletter" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "newsletter_filename_idx" ON "newsletter" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX IF NOT EXISTS "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX IF NOT EXISTS "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX IF NOT EXISTS "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX IF NOT EXISTS "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX IF NOT EXISTS "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_news_post_id_idx" ON "payload_locked_documents_rels" USING btree ("news_post_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_page_id_idx" ON "payload_locked_documents_rels" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_contact_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_diocese_id_idx" ON "payload_locked_documents_rels" USING btree ("diocese_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_event_id_idx" ON "payload_locked_documents_rels" USING btree ("event_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_project_id_idx" ON "payload_locked_documents_rels" USING btree ("project_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_charity_id_idx" ON "payload_locked_documents_rels" USING btree ("charity_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_fundraiser_id_idx" ON "payload_locked_documents_rels" USING btree ("fundraiser_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_local_court_id_idx" ON "payload_locked_documents_rels" USING btree ("local_court_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_newsletter_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "footer_social_media_icons_order_idx" ON "footer_social_media_icons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_social_media_icons_parent_id_idx" ON "footer_social_media_icons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_social_media_icons_icon_idx" ON "footer_social_media_icons" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "footer_links_order_idx" ON "footer_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_links_parent_id_idx" ON "footer_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_links_link_idx" ON "footer_links" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_sub_nav_links_order_idx" ON "header_nav_items_sub_nav_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_sub_nav_links_parent_id_idx" ON "header_nav_items_sub_nav_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_sub_nav_links_link_link_reference_idx" ON "header_nav_items_sub_nav_links" USING btree ("link_reference_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_sub_nav_order_idx" ON "header_nav_items_sub_nav" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_sub_nav_parent_id_idx" ON "header_nav_items_sub_nav" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_link_link_reference_idx" ON "header_nav_items" USING btree ("link_reference_id");
  CREATE INDEX IF NOT EXISTS "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "header_menu_icon_idx" ON "header" USING btree ("menu_icon_id");
  CREATE INDEX IF NOT EXISTS "header_close_icon_idx" ON "header" USING btree ("close_icon_id");
  CREATE INDEX IF NOT EXISTS "header_sub_menu_icon_idx" ON "header" USING btree ("sub_menu_icon_id");
  CREATE INDEX IF NOT EXISTS "header_back_icon_idx" ON "header" USING btree ("back_icon_id");
  CREATE INDEX IF NOT EXISTS "background_background_media_idx" ON "background" USING btree ("background_media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "news_post" CASCADE;
  DROP TABLE "news_post_rels" CASCADE;
  DROP TABLE "_news_post_v" CASCADE;
  DROP TABLE "_news_post_v_rels" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "page_hero_links" CASCADE;
  DROP TABLE "page_blocks_content_columns" CASCADE;
  DROP TABLE "page_blocks_content" CASCADE;
  DROP TABLE "page_blocks_stats_bar_stats" CASCADE;
  DROP TABLE "page_blocks_stats_bar" CASCADE;
  DROP TABLE "page_blocks_side_bar_sections" CASCADE;
  DROP TABLE "page_blocks_side_bar" CASCADE;
  DROP TABLE "page_blocks_contact_cards_contacts_to_list" CASCADE;
  DROP TABLE "page_blocks_contact_cards" CASCADE;
  DROP TABLE "page_blocks_tabs_tabs" CASCADE;
  DROP TABLE "page_blocks_tabs" CASCADE;
  DROP TABLE "page_blocks_news_posts_posts" CASCADE;
  DROP TABLE "page_blocks_news_posts" CASCADE;
  DROP TABLE "page_blocks_court_listing_courts" CASCADE;
  DROP TABLE "page_blocks_court_listing" CASCADE;
  DROP TABLE "page_blocks_calendar_months_month_items" CASCADE;
  DROP TABLE "page_blocks_calendar_months" CASCADE;
  DROP TABLE "page_blocks_calendar" CASCADE;
  DROP TABLE "page_blocks_media_with_text" CASCADE;
  DROP TABLE "page_blocks_slider_slides" CASCADE;
  DROP TABLE "page_blocks_slider" CASCADE;
  DROP TABLE "page_blocks_newsletters_newsletters" CASCADE;
  DROP TABLE "page_blocks_newsletters" CASCADE;
  DROP TABLE "page_blocks_dioceses_accordian" CASCADE;
  DROP TABLE "page" CASCADE;
  DROP TABLE "page_rels" CASCADE;
  DROP TABLE "_page_v_version_hero_links" CASCADE;
  DROP TABLE "_page_v_blocks_content_columns" CASCADE;
  DROP TABLE "_page_v_blocks_content" CASCADE;
  DROP TABLE "_page_v_blocks_stats_bar_stats" CASCADE;
  DROP TABLE "_page_v_blocks_stats_bar" CASCADE;
  DROP TABLE "_page_v_blocks_side_bar_sections" CASCADE;
  DROP TABLE "_page_v_blocks_side_bar" CASCADE;
  DROP TABLE "_page_v_blocks_contact_cards_contacts_to_list" CASCADE;
  DROP TABLE "_page_v_blocks_contact_cards" CASCADE;
  DROP TABLE "_page_v_blocks_tabs_tabs" CASCADE;
  DROP TABLE "_page_v_blocks_tabs" CASCADE;
  DROP TABLE "_page_v_blocks_news_posts_posts" CASCADE;
  DROP TABLE "_page_v_blocks_news_posts" CASCADE;
  DROP TABLE "_page_v_blocks_court_listing_courts" CASCADE;
  DROP TABLE "_page_v_blocks_court_listing" CASCADE;
  DROP TABLE "_page_v_blocks_calendar_months_month_items" CASCADE;
  DROP TABLE "_page_v_blocks_calendar_months" CASCADE;
  DROP TABLE "_page_v_blocks_calendar" CASCADE;
  DROP TABLE "_page_v_blocks_media_with_text" CASCADE;
  DROP TABLE "_page_v_blocks_slider_slides" CASCADE;
  DROP TABLE "_page_v_blocks_slider" CASCADE;
  DROP TABLE "_page_v_blocks_newsletters_newsletters" CASCADE;
  DROP TABLE "_page_v_blocks_newsletters" CASCADE;
  DROP TABLE "_page_v_blocks_dioceses_accordian" CASCADE;
  DROP TABLE "_page_v" CASCADE;
  DROP TABLE "_page_v_rels" CASCADE;
  DROP TABLE "contact_contact_roles" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "diocese_district_deputies" CASCADE;
  DROP TABLE "diocese_diocese_events" CASCADE;
  DROP TABLE "diocese" CASCADE;
  DROP TABLE "event" CASCADE;
  DROP TABLE "event_rels" CASCADE;
  DROP TABLE "_event_v" CASCADE;
  DROP TABLE "_event_v_rels" CASCADE;
  DROP TABLE "project" CASCADE;
  DROP TABLE "_project_v" CASCADE;
  DROP TABLE "charity" CASCADE;
  DROP TABLE "_charity_v" CASCADE;
  DROP TABLE "fundraiser" CASCADE;
  DROP TABLE "_fundraiser_v" CASCADE;
  DROP TABLE "local_court_court_events" CASCADE;
  DROP TABLE "local_court_court_projects" CASCADE;
  DROP TABLE "local_court_court_charities" CASCADE;
  DROP TABLE "local_court_court_fundraisers" CASCADE;
  DROP TABLE "local_court" CASCADE;
  DROP TABLE "local_court_rels" CASCADE;
  DROP TABLE "_local_court_v_version_court_events" CASCADE;
  DROP TABLE "_local_court_v_version_court_projects" CASCADE;
  DROP TABLE "_local_court_v_version_court_charities" CASCADE;
  DROP TABLE "_local_court_v_version_court_fundraisers" CASCADE;
  DROP TABLE "_local_court_v" CASCADE;
  DROP TABLE "_local_court_v_rels" CASCADE;
  DROP TABLE "newsletter" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "contact_form" CASCADE;
  DROP TABLE "footer_social_media_icons" CASCADE;
  DROP TABLE "footer_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "header_nav_items_sub_nav_links" CASCADE;
  DROP TABLE "header_nav_items_sub_nav" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "background" CASCADE;
  DROP TYPE "public"."enum_news_post_status";
  DROP TYPE "public"."enum__news_post_v_version_status";
  DROP TYPE "public"."enum_page_hero_links_link_type";
  DROP TYPE "public"."enum_page_hero_links_link_appearance";
  DROP TYPE "public"."enum_page_blocks_content_columns_size";
  DROP TYPE "public"."enum_page_blocks_side_bar_alignment";
  DROP TYPE "public"."enum_page_blocks_media_with_text_media_size";
  DROP TYPE "public"."enum_page_blocks_media_with_text_media_alignment";
  DROP TYPE "public"."enum_page_hero_type";
  DROP TYPE "public"."enum_page_status";
  DROP TYPE "public"."enum__page_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__page_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__page_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__page_v_blocks_side_bar_alignment";
  DROP TYPE "public"."enum__page_v_blocks_media_with_text_media_size";
  DROP TYPE "public"."enum__page_v_blocks_media_with_text_media_alignment";
  DROP TYPE "public"."enum__page_v_version_hero_type";
  DROP TYPE "public"."enum__page_v_version_status";
  DROP TYPE "public"."enum_contact_contact_type";
  DROP TYPE "public"."enum_event_event_type";
  DROP TYPE "public"."enum_event_status";
  DROP TYPE "public"."enum__event_v_version_event_type";
  DROP TYPE "public"."enum__event_v_version_status";
  DROP TYPE "public"."enum_project_project_type";
  DROP TYPE "public"."enum_project_status";
  DROP TYPE "public"."enum__project_v_version_project_type";
  DROP TYPE "public"."enum__project_v_version_status";
  DROP TYPE "public"."enum_charity_charity_type";
  DROP TYPE "public"."enum_charity_status";
  DROP TYPE "public"."enum__charity_v_version_charity_type";
  DROP TYPE "public"."enum__charity_v_version_status";
  DROP TYPE "public"."enum_fundraiser_fundraiser_type";
  DROP TYPE "public"."enum_fundraiser_status";
  DROP TYPE "public"."enum__fundraiser_v_version_fundraiser_type";
  DROP TYPE "public"."enum__fundraiser_v_version_status";
  DROP TYPE "public"."enum_local_court_status";
  DROP TYPE "public"."enum__local_court_v_version_status";
  DROP TYPE "public"."enum_newsletter_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_sub_nav_links_link_type";
  DROP TYPE "public"."enum_header_nav_items_sub_nav_links_link_appearance";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_link_appearance";`)
}
