import { Cake, CircleX, Compass, Heart, Pencil } from "lucide-react";
import { Progress } from "@/components/Progress/progress";
import Avatar from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/button";
import { Badge } from "@/components/Badge/badge";

export default function PersonalProfile() {
  return (
    <section className="h-svh flex justify-center items-start py-16">
      <article className="rounded-2xl border text-white max-w-5xl">
        <div className="flex items-center justify-between py-5 border-b px-9">
          <div className="flex items-center gap-4">
            <Avatar userAvatar="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" />
            <div>
              <h1 className="text-lg font-bold">John Doe</h1>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Cake size={16} />
                <span className="text-sm">25-34</span>
              </div>
            </div>
          </div>
          <Button className="flex items-center gap-2 text-sm font-bold rounded-xl">
            <Pencil size={16} /> Edit Profile
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_minmax(300px,1fr)] gap-12 px-9 py-7">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="flex items-center gap-2 font-bold">
                <Heart size={16} strokeWidth={2} /> Interests & Hobbies
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge className="text-sm py-1 px-2.5 rounded-xl">
                  Books & Stories
                </Badge>
                <Badge className="text-sm py-1 px-2.5 rounded-xl">
                  Art & Creation
                </Badge>
              </div>
              <p className="text-sm">
                Love reading sci-fi novels, collecting mechanical keyboards, and
                painting digital art
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="flex items-center gap-3 font-bold">
                <CircleX size={16} strokeWidth={2} /> Please avoid
              </h2>
              <p className="text-sm">
                I have a sensitivity to scented products and am trying to
                minimize plastic items - also not a big fan of super spicy foods
                (allergic to cayenne pepper).
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="flex items-center gap-2 font-bold mb-2">
              <Compass size={16} strokeWidth={2} /> Gift Styles
            </h2>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <div>Practical</div>
                <div className="font-bold">Whimsical</div>
              </div>
              <Progress value={95} />
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="font-bold">Cozy</div>
                <div>Adventurous</div>
              </div>
              <Progress value={15} />
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <div>Minimal</div>
                <div className="font-bold">Luxurious</div>
              </div>
              <Progress value={65} />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
