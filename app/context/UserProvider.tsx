"use client";

import { createContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type UserContextType = {
  user: any;
  loading: boolean;
};

export const UserContext = createContext<UserContextType | null>(null);

// ✅ Move Supabase client outside to avoid re-creating it on each render
const supabase = createClient();

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      setUser(session?.session?.user || null);
      setLoading(false);
    };

    fetchSession();

    // ✅ Ensure we listen for auth state changes correctly
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []); // ✅ No need to include supabase in dependencies, since it's outside

  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
}
