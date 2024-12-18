"use client";
import { Cake, CircleX, Compass, Heart, Pencil } from "lucide-react";
import { Progress } from "@/components/Progress/progress";
import Avatar from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/button";
import { Badge } from "@/components/Badge/badge";
import { Profile } from "@/app/types/profile";

interface ProfileCardProps {
  profile: Profile | null;
  showEditButton?: boolean;
}

const ProfileCard = ({ profile, showEditButton = false }: ProfileCardProps) => {
  const formatDisplayName = (displayName: string) => {
    const formattedDisplayName = displayName.split(" ").map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return formattedDisplayName.join(" ");
  };

  const formatCategory = (category: string) => {
    const categories = category.split("&");
    const formattedCategories = categories.map((categoryItem) => {
      const trimmedCategoryItem = categoryItem.trim();
      const firstLetter = trimmedCategoryItem.charAt(0).toUpperCase();
      const restOfCategory = trimmedCategoryItem.slice(1);
      return `${firstLetter}${restOfCategory}`;
    });
    return formattedCategories.join(" & ");
  };

  const renderPreference = (
    preferenceRight: string,
    preferenceLeft: string,
    preference_value: number | undefined
  ) => {
    if (!preference_value) {
      return (
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between">
            <div>{preferenceLeft}</div>
            <div>{preferenceRight}</div>
          </div>
          <Progress indicatorClassName="bg-[#E8577D]" value={0} />
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between">
          <div className={preference_value <= 50 ? "font-bold" : ""}>
            {preferenceLeft}
          </div>
          <div className={preference_value >= 50 ? "font-bold" : ""}>
            {preferenceRight}
          </div>
        </div>
        <Progress indicatorClassName="bg-[#E8577D]" value={preference_value} />
      </div>
    );
  };

  return (
    <article className="text-white px-4">
      <div className="flex items-center rounded-t-2xl justify-between py-5 px-9 bg-groupCardGreen">
        <div className="flex items-center gap-4">
          <Avatar userAvatar="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" />
          <div>
            <h1 className="text-lg font-bold">
              {formatDisplayName(profile?.display_name || "No Name Provided")}
            </h1>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Cake className="text-[#92AEA9]" size={16} />
              <span className="text-sm text-[#EDE6DF]">
                {profile?.age_group}
              </span>
            </div>
          </div>
        </div>
        {showEditButton && (
          <Button className="bg-[#C5DBB2] text-black flex items-center gap-2 text-sm font-bold rounded-xl hover:text-white">
            <Pencil size={16} /> Edit Profile
          </Button>
        )}
      </div>
      <div className="bg-[#12433A] rounded-b-2xl grid grid-cols-1 lg:grid-cols-[minmax(550px,2fr)_minmax(300px,1fr)] gap-12 pl-9 pr-28 py-7">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2 font-bold text-[#FFD17C]">
              <Heart size={16} strokeWidth={2} /> Interests & Hobbies
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile?.categories.map((category) => {
                const categoryName = formatCategory(category);
                return (
                  <Badge
                    key={category}
                    className="text-sm py-1 px-2.5 rounded-xl bg-[#DBDBB2] text-[#292913] hover:text-white"
                  >
                    {categoryName}
                  </Badge>
                );
              })}
            </div>
            <p className="text-sm">{profile?.hobbies}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="flex items-center gap-3 font-bold text-[#FDDEDE]">
              <CircleX size={16} strokeWidth={2} /> Please avoid
            </h2>
            <p className="text-sm">{profile?.avoid}</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="flex items-center gap-2 font-bold mb-2 text-[#E8577D]">
            <Compass size={16} strokeWidth={2} /> Gift Styles
          </h2>
          {renderPreference(
            "Practical",
            "Whimsical",
            profile?.practical_whimsical
          )}
          {renderPreference("Cozy", "Adventurous", profile?.cozy_adventurous)}
          {renderPreference("Minimal", "Luxurious", profile?.minimal_luxurious)}
        </div>
      </div>
    </article>
  );
};

export default ProfileCard;
