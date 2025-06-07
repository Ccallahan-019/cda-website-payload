// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import nodemailer from "nodemailer";

import { formBuilder } from "./plugins/formBuilder";

import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { collections } from "./collections/collectionsArray";
import { globals } from "./globals/globalsArray";
import { getServerURLs } from "./utils/getURL";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  cors: getServerURLs().filter(Boolean),
  csrf: getServerURLs().filter(Boolean),
  collections: collections,
  globals: globals,
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    formBuilder,
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
        newsletter: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
  email: nodemailerAdapter({
    defaultFromAddress: "info@payloadcms.com",
    defaultFromName: "Payload",
    transport: nodemailer.createTransport({
      service: process.env.SITE_MAIL_SERVICE,
      host: process.env.SMTP_SERVER_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_SERVER_USERNAME,
        pass: process.env.SMTP_SERVER_PASSWORD,
      },
    }),
  }),
});
