import SignOut from "@/components/features/auth/components/SignOut";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <main className="flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
          <p className="text-lg">
            This is a simple Next.js application with a custom layout and
            styles.
          </p>
        </div>
        {session ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-lg">Hi {session.user.name}!</p>
            <SignOut />
          </div>
        ) : (
          <div className="flex w-full flex-row items-center justify-center gap-4">
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
