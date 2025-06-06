import { protectedResourceHandlerClerk } from "@clerk/mcp-tools/next";

// TODO: this can just use env
const handler = protectedResourceHandlerClerk(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!
);

export { handler as GET };
