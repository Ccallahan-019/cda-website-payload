import { notFound } from "next/navigation";
import { getApolloServerClient } from "@/graghql/apolloClient";
import { cookies, draftMode } from "next/headers";
import { LivePreviewListener } from "@/components/live-preview-listener/LivePreviewListener";
import { Document } from "payload";
import RichText from "@/lexical-components/RichText";
import { GET_FUNDRAISER_BY_SLUG, GET_FUNDRAISER_SLUGS } from "@/graghql/queries/pages/fundraiserQueries";
import { FundraiserHero } from "@/heros/FundraiserHero";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const client = getApolloServerClient();
  const { data } = await client.query({
    query: GET_FUNDRAISER_SLUGS,
  });

  let params;
  if (data.Fundraisers.docs) {
    params = data.Fundraisers.docs.map((doc: Document) => ({
        slug: doc.slug
    }))
  } else {
    params = []
  }
    return params;
}

const queryFundraiserBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();
  const cookieStore = await cookies();
  const token = draft ? cookieStore.get('payload-token')?.value : undefined;

  const client = getApolloServerClient(token);
  
  const { data } = await client.query({
    query: GET_FUNDRAISER_BY_SLUG,
    variables: { slug, draft },
  });

  return data.Fundraisers.docs[0] || null;
}

type Args = {
    params: Promise<{
      slug?: string
    }>
  }

export default async function FundraiserPageTemplate({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode();
    const { slug = '' } = await paramsPromise;
    const fundraiser = await queryFundraiserBySlug({ slug })

    if (!fundraiser) {
      return notFound();
    }

  return (
    <article>
      {draft && <LivePreviewListener />}
      
      <FundraiserHero fundraiser={fundraiser} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={fundraiser.content} enableGutter={false} />
        </div>
      </div>
    </article>
  );
}