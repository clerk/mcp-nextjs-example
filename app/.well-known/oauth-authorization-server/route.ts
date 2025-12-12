import {
  authServerMetadataHandlerClerk,
  metadataCorsOptionsRequestHandler,
} from "@clerk/mcp-tools/next";

const handler = authServerMetadataHandlerClerk();

export { handler as GET };

export function OPTIONS(_: Request): Response {
  const preflightHandler = metadataCorsOptionsRequestHandler();
  return preflightHandler();
}
