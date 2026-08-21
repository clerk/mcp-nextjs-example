import { streamableHttpHandler, verifyClerkToken } from "@clerk/mcp-tools/next";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { McpServer } from "@modelcontextprotocol/server";

const clerk = await clerkClient();

// Transports are per-request and stateless in MCP SDK v2, so the handler
// takes a factory that builds a fresh server for every request.
function createServer() {
  const server = new McpServer(
    {
      name: "clerk-mcp-next",
      version: "0.0.1",
    },
    {
      // The 2026-07-28 protocol revision requires ttlMs/cacheScope on list
      // results. Without hints the SDK stamps the conservative
      // { ttlMs: 0, cacheScope: 'private' } ("immediately stale"); this
      // server's tool list is static, so let clients cache it for a minute.
      cacheHints: { "tools/list": { ttlMs: 60_000, cacheScope: "private" } },
    }
  );

  server.registerTool(
    "get-clerk-user-data",
    { description: "Gets data about the Clerk user that authorized this request" },
    async (ctx) => {
      // verifyToken guarantees this is present; the check keeps the failure
      // clear at this line if that guarantee ever drifts
      const userId = ctx.http?.authInfo?.extra?.userId;
      if (typeof userId !== "string") {
        throw new Error("Missing authenticated userId on request");
      }
      const userData = await clerk.users.getUser(userId);

      return {
        content: [{ type: "text", text: JSON.stringify(userData) }],
      };
    }
  );

  return server;
}

const handler = streamableHttpHandler(createServer, {
  verifyToken: async (token) => {
    const clerkAuth = await auth({ acceptsToken: "oauth_token" });
    // Note: OAuth tokens are machine tokens. Machine token usage is free
    // during our public beta period but will be subject to pricing once
    // generally available. Pricing is expected to be competitive and below
    // market averages.
    return verifyClerkToken(clerkAuth, token);
  },
});

// DELETE is exported alongside GET and POST so the handler — not Next's own
// 405 page — answers legacy session-termination requests with a JSON-RPC
// error body.
export { handler as DELETE, handler as GET, handler as POST };
