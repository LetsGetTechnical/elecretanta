"use server";

import { createClient } from "./supabase/server";

const getUserAvatar = async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const avatarUrl = user.user_metadata.avatar_url;

    return avatarUrl;
  } catch (error) {
    throw error;
  }
};

export default getUserAvatar;
