import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";

export async function GET() {
  const { session } = await validateRequest();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return new Response("OK", {
    status: 200,
    statusText: "OK",
  });
}
