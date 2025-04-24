import { Event, LocalCourt, NewsPost, Page } from "@/payload-types";
import { FieldHook } from "payload";

const forbiddenPrefixes = [
  'events/',
  'charities/',
  'projects/',
  'fundraisers/',
  'news/',
  'courts/',
];

export const cleanSlug = (input: string) =>
  input
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase();

export const cleanSlugHook: FieldHook<Page | NewsPost | Event | LocalCourt> = ({ value }) => {
  // If value doesn't exist yet, just return undefined so Payload skips it
  if (!value) return value;

  const cleaned = cleanSlug(value);

  const startsWithForbidden = forbiddenPrefixes.some(prefix =>
    cleaned.startsWith(prefix)
  );

  if (startsWithForbidden) {
    throw new Error(`Slug cannot start with reserved path: ${cleaned}`);
  }

  return cleaned;
};
