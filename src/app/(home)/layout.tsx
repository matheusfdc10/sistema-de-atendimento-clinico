import getSession from "@/actions/getSession"
import Header from "@/components/Header"
import { redirect } from "next/navigation"

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <>
      <Header />
      {children}
    </>
  )
}
