import { notFound } from "next/navigation";
import { getApolloServerClient } from "@/graghql/apolloClient";
import { cookies, draftMode } from "next/headers";
import { LivePreviewListener } from "@/components/live-preview-listener/LivePreviewListener";
import { Document } from "payload";
import { GET_EVENT_BY_SLUG, GET_EVENT_SLUGS } from "@/graghql/queries/pages/eventsQuery";
import { EventHero } from "@/heros/EventHero";
import RichText from "@/lexical-components/RichText";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const client = getApolloServerClient();
  const { data } = await client.query({
    query: GET_EVENT_SLUGS,
  });

  let params;
  if (data.Events.docs) {
    params = data.Events.docs.map((doc: Document) => ({
        slug: doc.slug
    }))
  } else {
    params = []
  }
    return params;
}

const queryEventBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();
  const cookieStore = await cookies();
  const token = draft ? cookieStore.get('payload-token')?.value : undefined;

  const client = getApolloServerClient(token);
  
  const { data } = await client.query({
    query: GET_EVENT_BY_SLUG,
    variables: { slug, draft },
  });

  return data.Events.docs[0] || null;
}

type Args = {
    params: Promise<{
      slug?: string
    }>
  }

export default async function EventPageTemplate({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode();
    const { slug = '' } = await paramsPromise;
    const event = await queryEventBySlug({ slug })

    if (!event) {
      return notFound();
    }

  return (
    <article>
      {draft && <LivePreviewListener />}
      
      <EventHero event={event} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={event.content} enableGutter={false} />
        </div>
      </div>
    </article>
  );
}