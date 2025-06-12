# MCP Server with Clerk & Next.js

A minimal example of an MCP server endpoint using Next.js and Clerk for authentication.

### Setup

- Run `npm i` to install dependencies
- Create a Clerk application and make sure you have been opted in to the OAuth beta flag (contact `support@clerk.com` or reach out to a contact at Clerk if you have one)
- Put [your API keys](https://dashboard.clerk.com/last-active?path=api-keys) in an `.env.local` file in the project
- Run `npm run dev` to start the app

### Connecting to the server

To test in cursor, for example, add the following config to your mcp config file:

```json
"mcp-clerk-next": {
  "url": "http://localhost:3000/mcp"
}
```

Examples of other clients coming soon!
