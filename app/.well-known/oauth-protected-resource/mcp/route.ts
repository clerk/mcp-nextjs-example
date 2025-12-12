import {
  metadataCorsOptionsRequestHandler,
  protectedResourceHandlerClerk,
} from "@clerk/mcp-tools/next";

const handler = protectedResourceHandlerClerk({
  scopes_supported: ["profile", "email"],
});

export { handler as GET };

export function OPTIONS(_: Request): Response | Promise<Response> {
  const preflightHandler = metadataCorsOptionsRequestHandler();
  return preflightHandler();
}
