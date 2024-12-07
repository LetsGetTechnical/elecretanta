import { Gift } from "lucide-react";

const NavLogo = () => {
  return (
    <div className="flex items-center">
      <Gift className="bg-logoWhite h-8 w-8 p-1 rounded-lg text-red-600" />
      <p className="font-bold ml-2 italic text-green-200">
        Elf<span className="text-white font-semibold">gorithm</span>
      </p>
    </div>
  );
};

export default NavLogo;
