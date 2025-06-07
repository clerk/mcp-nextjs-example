import { protectedResourceHandlerClerk } from "@clerk/mcp-tools/next";

const handler = protectedResourceHandlerClerk();

export { handler as GET };
