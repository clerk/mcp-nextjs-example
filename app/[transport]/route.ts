import { verifyClerkToken } from "@clerk/mcp-tools/next";
import { clerkClient } from "@clerk/nextjs/server";
import {
  createMcpHandler,
  experimental_withMcpAuth as withMcpAuth,
} from "@vercel/mcp-adapter";

const clerk = await clerkClient();

const handler = createMcpHandler((server) => {
  server.tool(
    "get-clerk-user-data",
    "Gets data about the Clerk user that authorized this request",
    {}, // tool parameters here if present
    async (_, { authInfo }) => {
      // non-null assertion is safe here, authHandler ensures presence
      const userId = authInfo!.extra!.userId! as string;
      const userData = await clerk.users.getUser(userId);

      return {
        content: [{ type: "text", text: JSON.stringify(userData) }],
      };
    }
  );
});

const authHandler = withMcpAuth(handler, verifyClerkToken, { required: true });

export { authHandler as GET, authHandler as POST };
