export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import { getApolloServerClient } from "@/graghql/apolloClient";
import { GET_PAGE_BY_SLUG } from "@/graghql/queries/pageQuery";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { RenderHero } from "@/heros/RenderHero";
import { cookies, draftMode } from "next/headers";
import { LivePreviewListener } from "@/components/live-preview-listener/LivePreviewListener";


const queryPageBySlug = async ({ path }: { path: string }) => {
  const { isEnabled: draft } = await draftMode();
  const cookieStore = await cookies();
  const token = draft ? cookieStore.get('payload-token')?.value : undefined;

  const client = getApolloServerClient(token);
  
  const { data } = await client.query({
    query: GET_PAGE_BY_SLUG,
    variables: { slug: path, draft },
  });

  return data.Pages.docs[0] || null;
}

type Args = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function PageTemplate({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode();
    const { slug = ['home'] } = await paramsPromise;
    const path = slug.join('/')

    const page = await queryPageBySlug({
      path,
    })

    if (!page) {
      return notFound();
    }

    const { hero, layout } = page;

    if (!page) return notFound();

  return (
    <article>
      {draft && <LivePreviewListener />}
      

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  );
}