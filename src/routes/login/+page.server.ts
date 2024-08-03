import { lucia } from "$lib/server/auth";
import client from "$lib/server/prisma";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";

export const actions: Actions = {
  default: async ({ request, cookies, url }) => {
    const { username, password } = Object.fromEntries(
      await request.formData()
    ) as Record<string, string>;

    const user = await client.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return fail(400, {
        message: "Wrong username or password",
      });
    }
    const validPassword = await new Argon2id().verify(user.password, password);

    if (!validPassword) {
      return fail(400, {
        message: "Wrong username or password",
      });
    }

    const session = await lucia.createSession(user.id, []);
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    const redirectTo = url.searchParams.get("redirectTo") || "/";

    if (redirectTo) {
      throw redirect(302, `/${redirectTo.slice(1)}`);
    }

    throw redirect(302, "/");
  },
};
