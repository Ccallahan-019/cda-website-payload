import { Event, LocalCourt, NewsPost, Page } from "@/payload-types"
import { FieldHook } from "payload"

const forbiddenPrefixes = [
    'events/',
    'charities/',
    'projects/',
    'fundraisers/',
    'news/',
    'courts/'
];

const cleanSlug = (input: string) =>
    input
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .toLowerCase()


export const cleanSlugHook: FieldHook<Page | NewsPost | Event | LocalCourt> = ({ value }) => {
    let rawSlug;

    if (value) {
        rawSlug = value;
    } else {
        throw new Error('Slug must have a value.');
    }

    const cleaned = cleanSlug(rawSlug);

    const startsWithForbidden = forbiddenPrefixes.some(prefix =>
        cleaned.startsWith(prefix)
    );

    if (startsWithForbidden) {
        throw new Error(`Slug cannot start with reserved path: ${cleaned}`);
    }

    return cleaned;
}