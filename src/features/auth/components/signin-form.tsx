"use client";

import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { Form, FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Mail } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signinForm } from "@/schemas/signinForm.schema";

export function SignInForm({
  className,
  redirectUrl = "/",
  ...props
}: ComponentProps<"div"> & { redirectUrl?: string }) {
  const form = useForm<z.infer<typeof signinForm>>({
    resolver: zodResolver(signinForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const signInWithProvider = async (providerId: any) => {
    // if (env.NODE_ENV === "production") {
    //   toast.error("This feature is not available in production");
    //   return;
    // }

    router.push("/dashboard");

    // await authClient.signIn.social(
    //   {
    //     provider: providerId,
    //     callbackURL: redirectUrl,
    //   },
    //   {
    //     onRequest: () => {
    //       toast.loading(`Redirecting to ${providerId}...`);
    //     },
    //     onResponse: () => {
    //       toast.success("Signed in successfully");
    //     },
    //   }
    // );
  };

  return (
    <div
      className={cn(
        "z-10 flex w-full max-w-sm flex-col items-center gap-6",
        className
      )}
      {...props}
    >
      <Form {...form}>
        <form
          className="flex min-w-sm flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            return null;
          }}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input
                disabled
                type="email"
                placeholder="Email"
                className="rounded-none !bg-[#1D1D1D]/100 text-base placeholder:text-[#9f9f9f]"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <Input
                disabled
                type="password"
                placeholder="Password"
                className="rounded-none !bg-[#1D1D1D]/100 text-base placeholder:text-[#9f9f9f]"
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            className="rounded-none text-base cursor-pointer"
            disabled
          >
            Login
          </Button>

          <p className="text-sm text-[#9f9f9f]">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="py-2 font-medium text-white cursor-pointer hover:underline"
            >
              Registre-se
            </Link>
          </p>
        </form>
      </Form>

      <div className="flex w-full max-w-sm flex-row items-center gap-2">
        <Separator
          className="h-[2px] !w-[calc(50%-14px)] bg-[#2e2e2e]/100"
          orientation="horizontal"
        />
        <span className="text-sm text-[#9f9f9f]">ou</span>
        <Separator
          className="h-[2px] !w-[calc(50%-14px)] bg-[#2e2e2e]/100"
          orientation="horizontal"
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <Button
          type="button"
          className="border-border rounded-none border py-2 text-base transition-all cursor-pointer"
          variant="outline"
          onClick={() => signInWithProvider("github")}
        >
          <Mail className="h-4 w-4" /> Login com Gmail
        </Button>
      </div>
    </div>
  );
}
