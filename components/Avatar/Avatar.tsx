import { AvatarImage } from "./AvatarImage";
import { AvatarFallback } from "./AvatarFallback";
import { AvatarBody } from "./AvatarBody";

const Avatar = () => {
  return (
    <AvatarBody>
      <AvatarImage src="" alt="" />
      <AvatarFallback>CN</AvatarFallback>
    </AvatarBody>
  );
};

export default Avatar;
