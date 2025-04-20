import ContactCard from "@/components/contact-card/ContactCard";
import RichText from "@/lexical-components/RichText";
import type { ContactCardsBlock as ContactCardsBlockProps } from "@/payload-types"

export const ContactCardsBlock: React.FC<ContactCardsBlockProps> = (props) => {
    const { richText, contactsToList } = props;

    return (
        <section className="relative my-8 overflow-hidden sm:my-12">
            <div className="relative container">
                <div className="max-w-md mx-auto text-center lg:max-w-2xl">
                    {richText && <RichText data={richText} />}
                </div>

                <div className="grid gap-4 md:gap-8 mt-12 grid-cols-12 sm:mt-16">
                    {contactsToList && contactsToList.length > 0 && contactsToList.map((contact, index) => {
                        if (typeof contact.contactToList === 'object') {
                            return (
                                <ContactCard key={contact.contactToList.id || index} contact={contact.contactToList} />
                            )
                        }
                    })}
                </div>
            </div>
        </section>
    )
}