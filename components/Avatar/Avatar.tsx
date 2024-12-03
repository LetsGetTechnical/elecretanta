import { AvatarImage } from "./AvatarImage";
import { AvatarFallback } from "./AvatarFallback";
import { AvatarBody } from "./AvatarBody";

const Avatar = ({ userAvatar }: { userAvatar: string }) => {
  return (
    <AvatarBody>
      <AvatarImage src={userAvatar} alt="" />
      <AvatarFallback>CN</AvatarFallback>
    </AvatarBody>
  );
};

export default Avatar;
