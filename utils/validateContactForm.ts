import { ContactFormInputs } from "../typedefs";
import { z } from "zod";

export default function validateContactForm(formData: ContactFormInputs) {
    const formSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits").optional(),
        message: z.string().min(1, "Message is required"),
    });

    return formSchema.safeParse(formData);
}