"use client";

import { UnauthenticatedView } from "@/features/auth/components/unauthenticated-view";
import { ClerkProvider, useAuth, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated><UserButton/>{children}</Authenticated>
        <Unauthenticated>
          <UnauthenticatedView />
        </Unauthenticated>
        <AuthLoading>Auth loading...</AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
