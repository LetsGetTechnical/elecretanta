import { useState, useEffect } from "react";
import { GiftExchange } from "@/app/types/giftExchange";
import { formatDate } from "@/lib/utils";
import {
  ChevronLeft,
  Settings,
  Share2,
  Verified,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/AlertDialogue/AlertDialgoue";
import { GiftExchangeMember } from "@/app/types/giftExchangeMember";
import { Button } from "@/components/Button/button";
// initialize type for exchange data response
interface PairingDataProps {
  pairingData: any;
}
interface MembersListProps {
  members: GiftExchangeMember[];
}

interface GiftExchangeHeaderProps {
  giftExchangeData: GiftExchange;
  id: string | string[] | undefined;
}
type GiftExchangeHeaderPropsUnion = GiftExchangeHeaderProps &
  MembersListProps &
  PairingDataProps;

export const GiftExchangeHeader = ({
  giftExchangeData,
  members,
  id,
  pairingData,
}: GiftExchangeHeaderPropsUnion) => {
  const [membersData, setMembersData] = useState(members);

  useEffect(() => {
    setMembersData(members);
  }, [members]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Verified />;
      case "active":
        return <Clock />;
      case "completed":
        return <CheckCircle />;
      case "cancelled":
        return <XCircle />;
      default:
        return <Verified />;
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Open";
      case "active":
        return "Active";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return "Open";
    }
  };

  // fetch call to thomas's matching logic
  const call = async () => {
    try {
      const response = await fetch(
        // currently fetches memberslist from
        `/api/gift-exchanges/${id}/draw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberData: {
              groupId: id,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("data:", data);
    } catch (error) {
      console.log("this is the error: ", error);
    }
  };

  console.log("members", members.length);
  console.log("membersData:", membersData);
  console.log("ID: ", id);
  return (
    <>
      <div className="flex justify-between">
        <Link href={"/dashboard"} className="flex items-center gap-1 text-sm">
          <ChevronLeft size={16} strokeWidth={2.25} />
          <span>Back to Dashboard</span>
        </Link>
        <Link href={"#"} className="flex items-center gap-1 text-sm">
          <Settings size={16} strokeWidth={2.25} />
          <span>Settings</span>
        </Link>
      </div>

      <section className="flex flex-col grow-0 gap-8 sm:flex-row">
        <div className="w-36 h-36 grow-0 shrink-0">
          <img
            className="w-full h-full rounded-xl ring-4 ring-white"
            src="https://img.freepik.com/free-vector/santa-claus-elements-red-background_1057-2152.jpg"
            alt="Group logo"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-row justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold">
                {giftExchangeData.name}
              </h1>
              <p className="text-xs">{giftExchangeData.description}</p>
            </div>
            <div>
              {getStatusText(giftExchangeData.status) === "Open" ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button disabled={membersData.length < 2}>
                      Draw Gift Exchange
                    </Button>
                  </AlertDialogTrigger>
                  {membersData.length < 2 && (
                    <p className="text-yellow-600 bg-yellow-100 border border-yellow-600 p-2 rounded-lg text-sm mt-2">
                      Gift Exchange needs 3 or more people to start
                    </p>
                  )}
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to start gift exchangee?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={call}>
                        Draw Gift Exchange
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : null}
            </div>
          </div>

          <div className="flex flex-row border-t pt-2 gap-16">
            <div className="flex items-center gap-2">
              {getStatusIcon(giftExchangeData.status)}
              <div className="text-md font-semibold">
                {getStatusText(giftExchangeData.status)}
              </div>
            </div>
            <div>
              <div className="text-md font-semibold">Gift Budget</div>
              <div className="">${giftExchangeData.budget}</div>
            </div>
            <div>
              <div className="text-md font-semibold">Draw date</div>
              <div className="">
                {formatDate(giftExchangeData.drawing_date)}
              </div>
            </div>
            <div>
              <div className="text-md font-semibold">Exchange Date</div>
              <div className="">
                {formatDate(giftExchangeData.exchange_date)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
