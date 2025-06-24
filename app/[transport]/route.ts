import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  createMcpHandler,
  experimental_withMcpAuth as withMcpAuth,
} from "@vercel/mcp-adapter";

const clerk = await clerkClient();

const handler = createMcpHandler((server) => {
  server.tool(
    "get-clerk-user-data",
    "Gets data about the Clerk user that authorized this request",
    {},
    async (_, { authInfo }) => {
      const userId = authInfo?.extra?.userId as string;
      if (!userId) {
        console.error(authInfo);
        return {
          content: [{ type: "text", text: "Error: user not authenticated" }],
        };
      }
      const user = await clerk.users.getUser(userId);
      return {
        content: [{ type: "text", text: JSON.stringify(user) }],
      };
    }
  );
});

const authHandler = withMcpAuth(
  handler,
  async (_, token) => {
    if (!token) return undefined;

    const { scopes, clientId, userId } = await auth({
      acceptsToken: "oauth_token",
    });

    if (!clientId || !scopes) {
      console.error("No scopes or clientId returned from auth()");
      return undefined;
    }

    return {
      token,
      scopes,
      clientId,
      extra: { userId },
    };
  },
  { required: true }
);

export { authHandler as GET, authHandler as POST };
