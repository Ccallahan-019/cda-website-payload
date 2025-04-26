import type { Metadata } from "next";
import { Merriweather_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/globals/header/Header";
import type { Header as HeaderProps } from "@/payload-types";
import Footer from "../../globals/footer/Footer";
import { getApolloServerClient } from "@/graghql/apolloClient";
import { GET_HEADER } from "@/graghql/queries/headerQuery";
import { GET_FOOTER } from "@/graghql/queries/footerQuery";
import { GET_BACKGROUND } from "@/graghql/queries/backgroundQuery";
import { Background } from "@/globals/background/BackgroundComponent";
import { AdminBar } from "@/components/admin-bar/AdminBar";
import { draftMode } from "next/headers";

const merriweather = Merriweather_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Catholic Daughters PA State Court",
  description: "Catholic Daughters of the Americas Pennsylvania State Court",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  const client = getApolloServerClient();
  const { data: headerData } = await client.query({
    query: GET_HEADER
  });
  const { data: footerData } = await client.query({
    query: GET_FOOTER
  });
  const { data: backgroundData } = await client.query({
    query: GET_BACKGROUND
  });
  const header: HeaderProps = headerData?.Header;
  const footer = footerData?.Footer;
  const background = backgroundData?.Background;

  return (
    <html lang="en">
      <body className={`${merriweather.className} antialiased`}>
        {background.backgroundMedia && typeof background.backgroundMedia === 'object' && (
          <Background id={background.backgroundMedia.id} backgroundMedia={background.backgroundMedia} />
        )}
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />
        <Header {...header} />
        <div className="relative z-[0] min-h-screen">
          {children}
        </div>
        <Footer footerData={footer} />
      </body>
    </html>
  );
}
