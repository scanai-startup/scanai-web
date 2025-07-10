// import { SiteHeader } from "@/components/layout/site-header";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const session = await auth.api.getSession({
  //     headers: await headers(),
  //   });

  //   if (session?.user.id) {
  //     redirect("/");
  //   }

  return (
    <main>
      {/* <SiteHeader /> */}
      {children}
    </main>
  );
}
