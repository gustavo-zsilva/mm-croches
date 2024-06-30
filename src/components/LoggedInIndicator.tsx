"use client";

import { useEffect, useState } from "react";

import "@/lib/firebase/firebase";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { clearToken } from "@/lib/actions/clearToken";
import { handleSetToken } from "@/lib/actions/setToken";

export function LoggedInIndicator() {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);

  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRefreshToken(user: User) {
    const idToken = await user.getIdToken();
    handleSetToken({ idToken });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        handleRefreshToken(user);
        setUser(user);
      } else {
        console.log("Signed Out");
        clearToken();
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div
      className="border-4 border-indigo-500 rounded-full fixed max-w-[50vw] top-4 right-4 cursor-pointer"
      onClick={handleSignOut}
    >
      <Avatar className="h-10">
        <AvatarImage src={user.photoURL || undefined} />
        <AvatarFallback>
          {user.displayName ? `${user.displayName.split(" ")[0][0]}` : "MT"}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
