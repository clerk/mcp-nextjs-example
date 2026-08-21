# MCP Server with Clerk & Next.js

A minimal example of an MCP server endpoint using Next.js and Clerk for authentication, built on the MCP SDK v2 packages (`@modelcontextprotocol/server`) and `@clerk/mcp-tools`' first-party streamable http handler — no external `mcp-handler` package needed. It targets MCP protocol revision 2026-07-28 and also answers the legacy `initialize` handshake, so older MCP clients keep working.

### Setup

- Run `pnpm i` to install dependencies
- Create a Clerk application, and make sure that dynamic client registration has been toggled on [in the dashboard](https://dashboard.clerk.com/last-active?path=oauth-applications).
- Put [your API keys](https://dashboard.clerk.com/last-active?path=api-keys) in an `.env.local` file in the project
- Run `pnpm run dev` to start the app

### Connecting to the server

To test in cursor, for example, add the following config to your mcp config file:

```json
"mcp-clerk-next": {
  "url": "http://localhost:3000/mcp"
}
```

Examples of other clients coming soon!

### Origin validation

The MCP spec requires servers to validate the `Origin` header to prevent DNS rebinding attacks. Requests to `/mcp` that carry an `Origin` header are rejected with a 403 unless the origin's hostname is localhost-class (`localhost`, `127.0.0.1`, `[::1]`). If you're connecting from a browser-based MCP client on another origin, pass its hostname via `allowedOrigins` in `app/mcp/route.ts`:

```ts
const handler = streamableHttpHandler(createServer, {
  allowedOrigins: ["my-web-client.example.com"],
  verifyToken: async (token) => {
    // ...
  },
});
```

Non-browser clients (Cursor, Claude, etc.) don't send an `Origin` header and are unaffected.
