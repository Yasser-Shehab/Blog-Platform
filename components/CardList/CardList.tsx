import { createClient } from "@/utils/supabase/server";
import Card from "../Card/Card";
import Link from "next/link";

const POSTS_PER_PAGE = 5;

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
};

async function getPosts(page: number): Promise<Post[]> {
  const supabase = await createClient();

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE - 1;

  const { data: posts, error } = await supabase.from("posts").select("*").range(start, end);

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return posts || [];
}

export default async function CardList({ searchParams }: { searchParams: { page?: string } }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const posts = await getPosts(page);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-1 gap-4">
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => <Card key={post.id} post={post} />)
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-4 mt-4">
        {page > 1 && (
          <Link href={`?page=${page - 1}`} className="px-4 py-2 bg-gray-500 text-white rounded">
            Previous
          </Link>
        )}

        {posts.length === POSTS_PER_PAGE && (
          <Link href={`?page=${page + 1}`} className="px-4 py-2 bg-blue-500 text-white rounded">
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
