"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth.client";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  async function onSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to home page
        },
      },
    });
  }
  return (
    <Button onClick={onSignOut} variant="outline">
      Sign Out
    </Button>
  );
}
