'use client';

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
  const files = useQuery(api.files.getFile);
  const createFile = useMutation(api.files.createFile);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>

      {files?.map(file => {
        return <div key={file._id}>{file.name}</div>;
      })}

      <Button onClick={() => {
        createFile({ name: "new file" });}}>Click me</Button>
    </main>
  );
}
