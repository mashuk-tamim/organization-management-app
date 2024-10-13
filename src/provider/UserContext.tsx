"use client";

import { IUser } from "@/types/user.interface";
import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
	user: IUser | null;
	loading: boolean;
}
const UserContext = createContext<UserContextType>({
	user: null,
	loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
	useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
			try {
				const res = await fetch("/api/getUser");
				if (res.ok) {
					const data = await res.json();
					setUser(data.user);
				}
			} catch (err) {
				console.error("Failed to fetch user", err);
			} finally {
        setLoading(false);
        setInitialized(true);
			}
		};

		fetchUser();
  }, []);
  
  if (!initialized) {
		// Return null or a minimal loading indicator if you prefer
		return null;
	}

	return <UserContext.Provider value={{user, loading}}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
