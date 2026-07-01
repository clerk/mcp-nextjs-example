# MCP Server with Clerk & Next.js

A minimal example of an MCP server endpoint using Next.js and Clerk for authentication.

### Getting started

- Run `pnpm i` to install dependencies.
- Create a Clerk application, then toggle on the **Dynamic client registration** option in the [**OAuth applications**](https://dashboard.clerk.com/~/oauth-applications) page in the Clerk Dashboard.
- Run `cp .env.example .env.local` and copy your Clerk API keys from the [**API keys**](https://dashboard.clerk.com/~/api-keys) page in the Clerk Dashboard into the `.env.local` file
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
