import { lucia } from "$lib/server/auth";
import client from "$lib/server/prisma";
import { redirect, type Actions } from "@sveltejs/kit";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const { username, password } = Object.fromEntries(data) as Record<
      string,
      string
    >;

    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password);

    const user = await client.user.create({
      data: {
        id: userId,
        username: username,
        password: hashedPassword,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    throw redirect(303, "/login");
  },
};
