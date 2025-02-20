import CardList from "@/components/CardList/CardList";
import { createClient } from "@/utils/supabase/server";

export default async function Home({ searchParams }: { searchParams: any }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log({ user });

  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <CardList searchParams={searchParams} />
    </main>
  );
}
