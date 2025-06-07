import {
  createMcpHandler,
  experimental_withMcpAuth as withMcpAuth,
} from "@vercel/mcp-adapter";
import { auth, clerkClient } from "@clerk/nextjs/server";

interface ClerkAuthInfo {
  id?: string;
  subject?: string;
  tokenType?: string;
  scopes?: string[];
}

const clerk = await clerkClient();

const handler = createMcpHandler((server) => {
  server.tool(
    "get-clerk-user-data",
    "Gets data about the Clerk user that authorized this request",
    {},
    async (_, { authInfo }) => {
      const clerkAuthInfo = authInfo as unknown as ClerkAuthInfo;
      if (!clerkAuthInfo?.subject) {
        console.error(authInfo);
        return {
          content: [{ type: "text", text: "Error: user not authenticated" }],
        };
      }
      const user = await clerk.users.getUser(clerkAuthInfo.subject);
      return {
        content: [{ type: "text", text: JSON.stringify(user) }],
      };
    }
  );
});

const authHandler = withMcpAuth(
  handler,
  async (_, token) => {
    if (!token) return null;
    return await auth({ acceptsToken: "oauth_token" });
  },
  { required: true }
);

export { authHandler as GET, authHandler as POST };
