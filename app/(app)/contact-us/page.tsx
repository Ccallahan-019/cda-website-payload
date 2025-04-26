export const dynamic = 'force-dynamic';

import { getApolloServerClient } from "@/graghql/apolloClient";
import { GET_CONTACT_FORM } from "@/graghql/queries/contactFormQuery";
import ContactForm from "../../../components/ui/forms/ContactForm";
import { RichText } from "@payloadcms/richtext-lexical/react";

export default async function ContactPage() {
    const client = getApolloServerClient();
      
    const { data } = await client.query({
        query: GET_CONTACT_FORM,
    });
    
    const contactForm = data?.ContactForm

    return (
        <div className="container my-16 sm:my-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 xl:gap-x-36">
                <div className="flex flex-col self-stretch">
                    <div className="flex flex-col justify-center flex-1">
                        <RichText data={contactForm.text} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <div>
                        <h3 className="text-base font-medium tracking-widest text-primary uppercase">
                            {contactForm.emailHeading}
                        </h3>
                        <p className="mt-2 text-base font-medium text-gray-900">
                            {contactForm.contactName}<br />
                            {contactForm.contactEmail}
                        </p>
                    </div>

                    <div className=" bg-gray-100 shadow-xl rounded-lg">
                        <div className="p-3 sm:p-6">
                            <ContactForm contactData={contactForm}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}