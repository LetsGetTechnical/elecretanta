"use client";
import { GiftExchange } from "@/app/types/giftExchange";
import { GiftExchangeMember } from "@/app/types/giftExchangeMember";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/Button/button";
import { LogIn } from "lucide-react";
import { signInWithGoogle } from "@/lib/utils";
interface WarningModalProps {
  giftExchangeData: GiftExchange;
  members: GiftExchangeMember[] | null;
  session: Session | null;
  updateGiftExchangeMembers: () => Promise<void>;
}

const WarningModal = ({
  giftExchangeData,
  members,
  session,
  updateGiftExchangeMembers,
}: WarningModalProps) => {
  const signIn = async () => {
    try {
      await signInWithGoogle({
        redirectPath: `/gift-exchanges/${giftExchangeData.id}`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const joinExchange = async () => {
    try {
      await fetch(`/api/gift-exchanges/${giftExchangeData.id}/members`, {
        method: "POST",
        body: JSON.stringify({ user_id: session?.user.id }),
      });

      await updateGiftExchangeMembers();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex backdrop-blur justify-center items-center z-50">
      <div className="bg-white rounded-lg text-center">
        <div className="text-sm font-bold p-4 bg-groupCardArrow text-black rounded-lg">
          You&apos;re invite to join
        </div>
        <div className="py-4 px-8 flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-bold text-red-600">
              {giftExchangeData.name}
            </h2>
            <p className="text-sm text-gray-500">
              {giftExchangeData.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div>
              <div className="text-sm font-bold">Gift Budget</div>
              <div className="text-sm">${giftExchangeData.budget}</div>
            </div>
            <div>
              <div className="text-sm font-bold">Members</div>
              <div className="text-sm">{members?.length || 0}</div>
            </div>
          </div>
          {session ? (
            <Button className="w-full" onClick={joinExchange}>
              Join <LogIn />
            </Button>
          ) : (
            <Button className="w-full flex items-center gap-2" onClick={signIn}>
              Sign in with Google to Join <LogIn />
            </Button>
          )}
          <div className="text-sm text-gray-500">
            You&apos;ll be able to set your interest after joining
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
