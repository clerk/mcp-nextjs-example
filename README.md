# MCP Server with Clerk & Next.js

A minimal example of an MCP server endpoint using Next.js and Clerk for authentication.

### Getting started

- Run `pnpm i` to install dependencies.
- Create a Clerk application, and make sure that dynamic client registration has been toggled on [in the Clerk Dashboard](https://dashboard.clerk.com/last-active?path=oauth-applications).
- Run `cp .env.sample .env.local` and copy your Clerk API keys [from your Clerk Dashboard](https://dashboard.clerk.com/last-active?path=api-keys) into the `.env.local` file
- Run `pnpm run dev` to start the app
- You should be able to connect to it now from any client that supports the latest version of the MCP spec. A cursor configuration is provided as a test.

### Connecting to the server

To test in cursor, for example, add the following config to your mcp config file:

```json
"mcp-clerk-next": {
  "url": "http://localhost:3000/mcp"
}
```

Examples of other clients coming soon!
