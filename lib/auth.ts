import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function getAuthUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  let dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!dbUser && user.email) {
    dbUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.user_metadata?.name || user.email.split('@')[0],
      }
    });
  }

  return dbUser;
}