import getCurrentUser from "@/actions/getCurrentUser";
import Header from "@/components/Header";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser()

  return (
    <>
      <Header role={currentUser?.role} />
      {children}
    </>
  );
}
