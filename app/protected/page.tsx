import CardForm from "@/components/CardForm/CardForm";
import CardList from "@/components/CardList/CardList";
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <CardForm />
      <CardList />
    </main>
  );
}
