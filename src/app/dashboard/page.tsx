import AdminDashboard from "./AdminDashboard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession()
  if (!session) {
    redirect("/login");
  }
	return <AdminDashboard />;
}
