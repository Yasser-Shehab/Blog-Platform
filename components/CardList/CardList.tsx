import { createClient } from "@/utils/supabase/server";
import Card from "../Card/Card";

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
};

async function getPosts(): Promise<Post[]> {
  // Fetch posts from a database or API
  const supabase = await createClient();
  const { data: posts, error } = await supabase.from("posts").select("*");
  if (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array if there's an error
  }

  return posts || []; // Return an empty array if posts is null
}

const CardList = async () => {
  const posts = await getPosts();

  return (
    <div className="grid grid-cols-1 gap-4">
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => <Card key={post.id} post={post} />)
      )}
    </div>
  );
};

export default CardList;
