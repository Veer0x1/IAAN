"use client"

import React, { FunctionComponent } from "react"
import { useRouter } from "next/navigation"
import { db, storage } from "@/firebase/config"
import { zodResolver } from "@hookform/resolvers/zod"
import { countries } from "countries-list"
import { Switch } from "@/components/ui/switch"
import { signIn } from "next-auth/react"
import { Timestamp, doc, setDoc ,
  collection,
  getDocs,
  query,
  where,} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
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
const founderFormSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select your gender.",
    invalid_type_error: "Select your gender",
  }),
  email: z
    .string({ required_error: "Please enter email" })
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  countryCode: z
    .string({ required_error: "Country code is required" })
    .nonempty({ message: "Country Code is required" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .nonempty({ message: "Phone number is required" }),
  linkedIn: z
    .string({ required_error: "LinkedIn Id is required" })
    .url({ message: "Invalid LinkedIn URL" }),
  country: z.string().nonempty({ message: "City is required" }),
  companyName: z
    .string()
    .nonempty({ message: "Startup company name  is required" }),
  sector: z.string().nonempty({ message: "Sector  is required" }),
  websiteName: z
    .string()
    .nonempty({ message: "Website name is required" })
    .url({ message: "Invalid  URL" }),
  comDescription: z
    .string({ required_error: "Company description is required" })
    .nonempty({ message: "Company description is required" }),
    mentorship: z.boolean().default(false),
  file: z
    .object({
      image: z
        .any()
        .refine(
          (image) =>
            /\.(jpg|jpeg|png|webp)$/i.test(image[0]?.name),
          `Only .jpg, .jpeg, .png and .webp formats are supported.`
        ),
    })
    .refine((file) => file?.image[0], 'Please select an image file.'),

})

export type FormType = z.infer<typeof founderFormSchema>
const countryOptions = Object.values(countries)
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

const FounderForm: FunctionComponent<Props> = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(founderFormSchema),
    mode: "onBlur",
    defaultValues: {
      gender: "Male",
      countryCode: "+91 India",
    },
  })
  const route = useRouter()
  const onSubmit =async(data: FormType) => {
    try {  const querySnapshot1 = await getDocs(
      query(collection(db, "founders"), where("email", "==", data.email))
    )
      if(querySnapshot1.empty){
        console.log(data.file.image[0])
        const file = data.file.image[0];
        const storageRef = ref(storage, `images/${data.firstName + data.phone}`)
        // @ts-ignore
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            toast({title: `Upoading ${progress}`})
            switch (snapshot.state) {
              case "paused":
                toast({title: "Upload is paused"})
                break
              case "running":
                toast({title: `Upoading image ${Math.ceil(progress)}%`})

                break
            }

        },
        (error) => {
          toast({ title: error.message })
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            if (downloadURL) {
              data.file.image=""
              await setDoc(doc(db, "founders", data.firstName + data.phone), {...data,date:Timestamp.now(),websitePhoto:downloadURL});
              toast({title: "Welcome to IAAN"})
              signIn("linkedin")
              // route.push("/login")
            }

          })
        }
      )}
      else {
        toast({
          title: "Email already exists",
          description: "Please use another email or sign in to your account.",
        })
      }
    } catch (error: any) {
      toast({ title: error.message })
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
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Rahul" {...field} />
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
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Kumar" {...field} />
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
                            <option value={"Male"}>Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
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
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="rahul123@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <div className={"md:flex "}>
              <FormField
                control={form.control}
                name="countryCode"
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
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>LinkedIn Profile URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <div className={"md:flex md:p-2"}>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
            <div className={"md:flex "}>
              <FormField
                control={form.control}
                name={"sector"}
                render={({ field }) => (
                  <>
                    <FormItem className="mt-[1rem]" >
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
              {/*    <FormItem className={"flex flex-col p-2"}>*/}
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
              {/*            <CommandEmpty>No language found.</CommandEmpty>*/}
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
              <FormField
                control={form.control}
                name="websiteName"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="file"
              render={() => (
                <>
                  <FormItem>
                    <FormLabel>Company Image</FormLabel>
                    <FormControl>
                      <Input type="file"
            {...form.register('file.image')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="comDescription"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
           < FormField
              control={form.control}
              name="mentorship"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Mentorship</FormLabel>
                    <FormDescription>
                      Want to take mentorship from investors?
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
            <Button type="submit" className={"m-4 ml-6"}>
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </>
  )
}

export default FounderForm
