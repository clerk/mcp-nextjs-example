import { authServerMetadataHandlerClerk } from "@clerk/mcp-tools/next";

const handler = authServerMetadataHandlerClerk();

export { handler as GET };
