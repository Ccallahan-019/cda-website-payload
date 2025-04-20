"use client";

import { useEffect, useState } from "react";
import { ContactFormInputs } from "@/typedefs";
import validateContactForm from "@/utils/validateContactForm";
import ContactFormInput from "../inputs/ContactFormInput";
import ContactFormTextArea from "../inputs/ContactFormTextArea";
import type { ContactForm as ContactFormProps } from "@/payload-types";
import { Button } from "../buttons/button";

type Props = {
    contactData: ContactFormProps;
}

export default function ContactForm({ contactData }: Props) {
    const [formData, setFormData] = useState<ContactFormInputs>({
        name: "",
        email: "",
        phone: "",
        message: "",
        csrfToken: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear errors as user types
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);

        const validation = validateContactForm(formData);
        if (!validation.success) {
            const newErrors: { [key: string]: string } = {};
            validation.error.issues.forEach((issue) => {
                newErrors[issue.path[0]] = issue.message;
            });
            setErrors(newErrors);
            setLoading(false);
            return;
        }


        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.status === 429) {
                setError("Too many submissions. Please try again later.");
            } else if (!response.ok) {
                setError(data.error || "Something went wrong, please try again.");
            } else {
                setSuccess(true);
                setFormData({ ...formData, name: "", email: "", phone: "", message: "" })
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch(error) {
                setError("Failed to send message.");
            } finally {
                setLoading(false);
            }
        };
          

        useEffect(() => {
            fetch("/api/csrf-token")
                .then(res => res.json())
                .then(data => {
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        csrfToken: data.csrfToken
                    }));
                });
        }, []);

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
                <ContactFormInput
                    label={contactData.nameLabel}
                    type="text"
                    name="name"
                    placeholder={contactData.namePlaceholder}
                    value={formData.name}
                    onChange={handleChange}
                    required={true}
                    errors={errors.name}
                />
                <ContactFormInput
                    label={contactData.emailLabel}
                    type="email"
                    name="email"
                    placeholder={contactData.emailPlaceholder}
                    value={formData.email}
                    onChange={handleChange}
                    required={true}
                    errors={errors.email}
                />
                <ContactFormInput
                    label={contactData.phoneLabel}
                    type="tel"
                    name="phone"
                    placeholder={contactData.phonePlaceholder}
                    value={formData.phone}
                    onChange={handleChange}
                    required={false}
                    errors={errors.phone}
                />

                <ContactFormTextArea
                    label={contactData.messageLabel}
                    name="message"
                    placeholder={contactData.messagePlaceholder}
                    value={formData.message}
                    onChange={handleChange}
                    required={true}
                    errors={errors.message}
                />

                <Button
                    type="submit"
                    disabled={loading}
                    size="full"
                    variant="secondary"
                >
                    {loading ? "Sending..." : "Send"}
                </Button>

                {success && <p className="text-green-500">Message sent successfully!</p>}
                {error && <p className="sm:col-span-2 text-red-500 text-sm">{error}</p>}
        </form>
    );
}
