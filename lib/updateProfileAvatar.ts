"use server";

import { createClient } from "./supabase/server";

const updateProfileAvatar = async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const avatarUrl = user.user_metadata.avatar_url;

    await supabase
      .from("profiles")
      .update({ avatar: avatarUrl })
      .eq("id", session?.user.id);
  } catch (error) {
    throw error;
  }
};

export default updateProfileAvatar;
