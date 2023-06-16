import * as z from "zod"

export const investorFormSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z
    .string({ required_error: "Please enter email" })
    .email({ message: "Invalid email address" }),
  linkedIn: z.string().url({ message: "Invalid LinkedIn URL" }),
  phone: z.string(),
  gender: z.enum(["male", "female", "other"], {
    invalid_type_error: "Select your gender",
    required_error: "Please select your gender.",
  }),
  commitment: z.enum(["5L", "10L", "15L", "20L+"]),
  sector: z.string(),
  mentorship: z.boolean().default(false),
  country: z.string({ required_error: "Please select your country" }),
})

export type FormValues = z.infer<typeof investorFormSchema>
