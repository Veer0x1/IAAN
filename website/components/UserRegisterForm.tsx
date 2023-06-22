"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

type FormData = z.infer<typeof userAuthSchema>

export default function UserRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  const [isLinkedinLoading, setIsLinkedinLoading] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      })
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    })
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account </CardTitle>
        <CardDescription>
          Enter your email and password below to create <br /> an account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <div className="grid gap-2">
            <div className={"grid gap-1"}>
              <Label htmlFor="username" className={"m-1 text-sm font-light"}>
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder=""
                autoCapitalize={"none"}
                autoCorrect="off"
                disabled={isLoading || isLinkedinLoading}
              />
              <Label htmlFor="email" className={"m-1 text-sm font-light"}>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@provider.com"
                autoCapitalize={"none"}
                autoCorrect="off"
                disabled={isLoading || isLinkedinLoading}
                {...register("email")}
              />
              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
              <Label htmlFor="password" className={"m-1 text-sm font-light"}>
                Password
              </Label>
              <Input id="password" type="password" />
            </div>
          </div>

          {/* <Button type={"submit"} className="mt-4 w-full" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create account
          </Button> */}
        {/* </form> */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Button
            type="button"
            onClick={() => {
              setIsLinkedinLoading(true)
              signIn("linkedin")
            }}
            variant="outline"
            disabled={isLinkedinLoading || isLoading}
          >
            {isLinkedinLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.linkedin className="mr-2 h-4 w-4 text-[#0077b5]" />
            )}{" "}
            LinkedIn
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p
          className={cn(
            buttonVariants({ variant: "link" }),
            "px-8 text-center text-xs text-muted-foreground hover:text-accent-foreground"
          )}
        >
          <Link
            href={"/login"}
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Log In
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
