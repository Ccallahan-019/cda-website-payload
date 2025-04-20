import { notFound } from "next/navigation";
import { getApolloClient } from "@/graghql/apolloClient";
import { GET_PAGE_BY_SLUG } from "@/graghql/queries/pageQuery";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { RenderHero } from "@/heros/RenderHero";
import type { Document } from "payload";
import { cookies, draftMode } from "next/headers";
import { LivePreviewListener } from "@/components/live-preview-listener/LivePreviewListener";

export default async function PageTemplate({
  params,
}: {
  params: { slug?: string[] };
}) {
  const { isEnabled: draft } = await draftMode();
  const slug = params.slug || ["home"];
  const path = slug.join("/");

  const cookieStore = await cookies();
  const token = draft ? cookieStore.get("payload-token")?.value : undefined;

  const client = getApolloClient(token);

  try {
    const { data } = await client.query({
      query: GET_PAGE_BY_SLUG,
      variables: { slug: path, draft },
    });

    const page: Document | null = data.Pages?.docs?.[0] || null;

    if (!page) return notFound();

    const { hero, layout } = page;

    return (
      <article>
        {draft && <LivePreviewListener />}
        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} />
      </article>
    );
  } catch (err) {
    console.error("Error fetching page data:", err);
    return notFound();
  }
}