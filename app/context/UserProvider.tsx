"use client"; // Allows using React state & context

import { createContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";

type UserContextType = {
  user: any; // Adjust the type based on your Supabase user object
  loading: boolean;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
}
