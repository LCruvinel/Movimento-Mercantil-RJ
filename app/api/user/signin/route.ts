import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import isEmail from "validator/es/lib/isEmail";

export async function POST(req: Request) {
  const { useremail, password } = await req.json();
  const email = useremail.toLowerCase();

  if (!isEmail(email)) {
    return new Response("Password ou usuário errados", {
      status: 401,
      statusText: "Password ou usuário errados",
    });
  }

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return new Response("Password ou usuário errados", {
      status: 401,
      statusText: "Password ou usuário errados",
    });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
  });

  if (!existingUser) {
    return new Response("Password ou usuário errados", {
      status: 401,
      statusText: "Password ou usuário errados",
    });
  }

  const validPassword = await verify(existingUser.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    return new Response("Password ou usuário errados", {
      status: 401,
      statusText: "Password ou usuário errados",
    });
  }

  if (!existingUser.habilitado) {
    return new Response("Password ou usuário errados", {
      status: 401,
      statusText: "Password ou usuário errados",
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
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
