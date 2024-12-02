"use server";

import { client } from "@/lib/prisma";

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        type: true,
        id: true,
      },
    });

    if (registered) {
      return { status: 200, user: registered };
    }
  } catch (error) {}
};
