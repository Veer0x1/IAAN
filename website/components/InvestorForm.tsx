"use client"

import React, { FunctionComponent } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { db } from "@/firebase/config"
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod"
import { countries } from "countries-list"
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore"
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form"

interface OwnProps {}

type Props = OwnProps

const investorFormSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z
    .string({ required_error: "Please enter email" })
    .email({ message: "Invalid email address" }),
  linkedIn: z
    .string()
    .refine((value) => /^https?:\/\/(?:www\.)?linkedin\.com\/.*$/.test(value), {
      message: "Invalid LinkedIn URL",
    }),

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

type FormValues = z.infer<typeof investorFormSchema>

const sectors = [
  { label: "FinTech", value: "fintech" },
  { label: "Health Care", value: "health care" },
  { label: "Agriculture", value: "agriculture" },
  { label: "Real Estate", value: "real estate" },
  { label: "Retail", value: "retail" },
  { label: "E-Commerce", value: "e-commerce" },
  { label: "EdTech", value: "edtech" },
  { label: "BioTech", value: "biotech" },
  { label: "Logistics", value: "logistics" },
  { label: "Analytics", value: "analytics" },
  { label: "AI", value: "ai" },
  { label: "IoT", value: "iot" },
  { label: "Other", value: "other" },

] as const

const InvestorForm: FunctionComponent<Props> = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(investorFormSchema),
    mode: "onBlur",
    defaultValues: {
      gender: "male",
      commitment: "5L",
      country:"+91 India"
    },
  })
  const [isOpen, setIsOpen] = React.useState(false);
  const countryOptions = Object.values(countries)
  const onSubmit = async (data: FormValues) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "investors"), where("email", "==", data.email))
      )

      if (querySnapshot.docs.length === 0) {
        await setDoc(
          doc(db, "investors", data.firstName.split(" ")[0] + data.phone),
          data
        )
        signIn("linkedin")
        toast({
          title: "Successfully submitted",
          action: (
            <Link href={"/"}>
              <ToastAction altText="Go to schedule to undo">Home</ToastAction>
            </Link>
          ),
        })
      } else {
        toast({
          title: "Email already exists",
          description: "Please use another email or sign in to your account.",
        })
      }
    } catch (e: any) {
      toast({
        title: "Something went wrong",
        description: e.message,
      })
    }
  }

  return (
    <>
      <Card className={"min-w-max"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className={"md:flex md:p-2"}>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <>
                    <FormItem className={"m-4"}>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Balveer Singh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <>
                    <FormItem className={"m-4"}>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Rao" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <>
                    <FormItem className={"m-4"}>
                      <FormLabel>Gender</FormLabel>
                      <div className="relative w-max">
                        <FormControl>
                          <select
                            className={cn(
                              buttonVariants({ variant: "outline" }),
                              "w-[200px] appearance-none bg-transparent font-normal"
                            )}
                            {...field}
                          >
                            <option value={"male"}>Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </FormControl>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormItem className={"m-4"}>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <>
                  <FormItem className={"m-4"}>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <div className={"md:flex"}>
              <FormField
                control={form.control}
                name={"country"}
                render={({ field }) => (
                  <>
                    <FormItem className={"m-4"}>
                      <FormLabel>Country Code</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <ScrollArea className={"h-72 w-48"}>
                              {countryOptions.map((country, index) => {
                                return (
                                  <SelectItem
                                    key={index}
                                    value={`+${country?.phone} ${country?.name}`}
                                  >
                                    {`+${country?.phone}`} {country?.name}
                                  </SelectItem>
                                )
                              })}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <>
                    <FormItem className={"m-4"}>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Preferably WhatsApp number
                      </FormDescription>
                    </FormItem>
                  </>
                )}
              />
            </div>

            <div className={"md:flex"}>
              <FormField
                control={form.control}
                name="commitment"
                render={({ field }) => (
                  <FormItem className={"flex flex-col"}>
                    <FormLabel>Commitment</FormLabel>
                    <div className="relative w-max">
                      <FormControl>
                        <select
                          className={cn(
                            buttonVariants({ variant: "outline" }),
                            "w-[200px] appearance-none bg-transparent font-normal"
                          )}
                          {...field}
                        >
                          <option value="5L">5L</option>
                          <option value="10L">10L</option>
                          <option value="15L">15L</option>
                          <option value="20L+">20L+</option>
                        </select>
                      </FormControl>
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                    </div>
                    <FormDescription>Minimum commitment amount</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"sector"}
                render={({ field }) => (
                  <>
                    <FormItem className="mt-[.35rem]" >
                      <FormLabel>Sector</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <ScrollArea className={"h-72 w-48"}>
                              {sectors.map((sector, index) => {
                                return (
                                  <SelectItem
                                    key={index}
                                    value={sector.value}
                                  >
                                   <span className="capitalize"> {sector.value}</span>
                                  </SelectItem>
                                )
                              })}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              {/*<FormField*/}
              {/*  control={form.control}*/}
              {/*  name="sector"*/}
              {/*  render={({ field }) => (*/}
              {/*    <FormItem className={"flex flex-col"}>*/}
              {/*      <FormLabel>Sector</FormLabel>*/}
              {/*      <Popover>*/}
              {/*        <PopoverTrigger asChild>*/}
              {/*          <FormControl>*/}
              {/*            <Button*/}
              {/*              variant="outline"*/}
              {/*              role="combobox"*/}
              {/*              className={cn(*/}
              {/*                "w-[200px] justify-between",*/}
              {/*                !field.value && "text-muted-foreground"*/}
              {/*              )}*/}
              {/*            >*/}
              {/*              {field.value*/}
              {/*                ? sectors.find(*/}
              {/*                    (language) => language.value === field.value*/}
              {/*                  )?.label*/}
              {/*                : "Select Sector"}*/}
              {/*              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />*/}
              {/*            </Button>*/}
              {/*          </FormControl>*/}
              {/*        </PopoverTrigger>*/}
              {/*        <PopoverContent className="w-[200px] p-0">*/}
              {/*          <Command>*/}
              {/*            <CommandInput placeholder="Search language..." />*/}
              {/*            <CommandEmpty>No sector found.</CommandEmpty>*/}
              {/*            <CommandGroup>*/}
              {/*              {sectors.map((language) => (*/}
              {/*                <CommandItem*/}
              {/*                  value={language.value}*/}
              {/*                  key={language.value}*/}
              {/*                  onSelect={(value) => {*/}
              {/*                    form.setValue("sector", value)*/}
              {/*                  }}*/}
              {/*                >*/}
              {/*                  <Check*/}
              {/*                    className={cn(*/}
              {/*                      "mr-2 h-4 w-4",*/}
              {/*                      language.label === field.value*/}
              {/*                        ? "opacity-100"*/}
              {/*                        : "opacity-0"*/}
              {/*                    )}*/}
              {/*                  />*/}
              {/*                  {language.label}*/}
              {/*                </CommandItem>*/}
              {/*              ))}*/}
              {/*            </CommandGroup>*/}
              {/*          </Command>*/}
              {/*        </PopoverContent>*/}
              {/*      </Popover>*/}
              {/*      <FormMessage />*/}
              {/*    </FormItem>*/}
              {/*  )}*/}
              {/*/>*/}
            </div>
            <FormField
              control={form.control}
              name="mentorship"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Mentorship</FormLabel>
                    <FormDescription>
                      Want to provide mentorship to startups?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className={"m-4"}>
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </>
  )
}

export default InvestorForm
