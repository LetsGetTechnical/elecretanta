import { Cake, CircleX, Compass, Heart, Pencil } from "lucide-react";
import { Progress } from "@/components/Progress/progress";
import Avatar from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/button";
import { Badge } from "@/components/Badge/badge";

interface ProfileCardProps {
  showEditButton?: boolean;
}

const ProfileCard = ({ showEditButton = false }: ProfileCardProps) => {
  return (
    <article className="text-white px-4">
      <div className="flex items-center rounded-t-2xl justify-between py-5 px-9 bg-groupCardGreen">
        <div className="flex items-center gap-4">
          <Avatar userAvatar="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" />
          <div>
            <h1 className="text-lg font-bold">John Doe</h1>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Cake className="text-[#92AEA9]" size={16} />
              <span className="text-sm text-[#EDE6DF]">25-34</span>
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
              <Badge className="text-sm py-1 px-2.5 rounded-xl bg-[#DBDBB2] text-[#292913] hover:text-white">
                Books & Stories
              </Badge>
              <Badge className="text-sm py-1 px-2.5 rounded-xl bg-[#DBDBB2] text-[#292913] hover:text-white">
                Art & Creation
              </Badge>
            </div>
            <p className="text-sm">
              Love reading sci-fi novels, collecting mechanical keyboards, and
              painting digital art
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="flex items-center gap-3 font-bold text-[#FDDEDE]">
              <CircleX size={16} strokeWidth={2} /> Please avoid
            </h2>
            <p className="text-sm">
              I have a sensitivity to scented products and am trying to minimize
              plastic items - also not a big fan of super spicy foods (allergic
              to cayenne pepper).
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="flex items-center gap-2 font-bold mb-2 text-[#E8577D]">
            <Compass size={16} strokeWidth={2} /> Gift Styles
          </h2>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between">
              <div>Practical</div>
              <div className="font-bold">Whimsical</div>
            </div>
            <Progress indicatorClassName="bg-[#E8577D]" value={95} />
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="font-bold">Cozy</div>
              <div>Adventurous</div>
            </div>
            <Progress indicatorClassName="bg-[#E8577D]" value={15} />
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between">
              <div>Minimal</div>
              <div className="font-bold">Luxurious</div>
            </div>
            <Progress indicatorClassName="bg-[#E8577D]" value={65} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProfileCard;
