import { AvatarImage } from './AvatarImage';
import { AvatarFallback } from './AvatarFallback';
import { AvatarBody } from './AvatarBody';

const Avatar = ({ userAvatar }: { userAvatar: string | undefined }) => {
  return (
    <AvatarBody>
      <AvatarImage src={userAvatar} alt="" />
      <AvatarFallback>
        <img
          src="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg"
          alt="default avatar"
        />
      </AvatarFallback>
    </AvatarBody>
  );
};

export default Avatar;
