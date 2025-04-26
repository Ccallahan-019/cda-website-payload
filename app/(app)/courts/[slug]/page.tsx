export const dynamic= 'force-dynamic';

import { notFound } from "next/navigation";
import { getApolloServerClient } from "@/graghql/apolloClient";
import { GET_COURT_BY_SLUG } from "@/graghql/queries/courtQuery";
import { cookies, draftMode } from "next/headers";
import { LivePreviewListener } from "@/components/live-preview-listener/LivePreviewListener";
import RichText from "@/lexical-components/RichText";
import { CourtHero } from "@/heros/CourtHero";
import CourtInfoBanner from "@/components/court-page/CourtInfoBanner";
import CourtOfficerCard from "@/components/court-page/CourtOfficerCard";
import { Document } from "payload";
import { GET_COURT_SLUGS } from "@/graghql/queries/courtSlugQuery";

export const revalidate = 60;
export const dynamicParams = true;



export async function generateStaticParams() {
  const client = getApolloServerClient();
  const { data } = await client.query({
    query: GET_COURT_SLUGS,
  });

  const params = data.LocalCourts.docs.map((doc: Document) => ({
    slug: doc.slug
  }))

    return params;
}

const queryCourtBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();
  const cookieStore = await cookies();
  const token = draft ? cookieStore.get('payload-token')?.value : undefined;

  const client = getApolloServerClient(token);
  
  const { data } = await client.query({
    query: GET_COURT_BY_SLUG,
    variables: { slug, draft },
  });

  return data.LocalCourts.docs[0] || null;
}

type Args = {
    params: Promise<{
      slug?: string
    }>
  }

export default async function CourtPageTemplate({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode();
    const { slug = '' } = await paramsPromise;
    const court = await queryCourtBySlug({ slug })

    if (!court) {
      return notFound();
    }

  return (
    <article>
      {draft && <LivePreviewListener />}
      
      <CourtHero court={court} />

      <div className="pt-8">
        <div className="container">
            <div className="max-w-[80rem] mx-auto flex flex-col gap-4">
                <CourtInfoBanner court={court} />
                <div className="grid grid-cols-12 gap-4">
                    <CourtOfficerCard className="col-span-12 md:col-span-4 lg:col-span-3" officers={court.courtOfficers} />
                    <RichText
                        className="col-span-12 md:col-span-8 lg:col-span-9 p-8 rounded-xl bg-background/60 backdrop-blur-sm shadow-xl"
                        data={court.content}
                        enableGutter={false}
                    />
                    
                </div>
            </div>
        </div>
      </div>
    </article>
  );
}