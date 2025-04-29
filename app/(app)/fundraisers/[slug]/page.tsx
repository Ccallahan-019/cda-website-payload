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
    <article className="flex flex-col min-h-screen">
      {draft && <LivePreviewListener />}
      
      <FundraiserHero fundraiser={fundraiser} />

      <div className="grow flex flex-col items-center gap-4">
        <div className="grow flex flex-col container">
          <RichText
            className="grow w-full max-w-[64rem] mx-auto bg-background/70 backdrop-blur-sm py-10 px-4 sm:px-6 md:px-10"
            data={fundraiser.content}
            enableGutter={false}
          />
        </div>
      </div>
    </article>
  );
}