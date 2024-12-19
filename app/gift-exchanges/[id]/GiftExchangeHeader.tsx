import { Button } from "@/components/Button/button";
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

interface GiftExchangeHeaderProps {
  giftExchangeData: GiftExchange;
}

export const GiftExchangeHeader = ({
  giftExchangeData,
}: GiftExchangeHeaderProps) => {
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

      <div className="flex grow-0 gap-8 sm:flex-row">
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
                <Button>Draw Gift Exchange</Button>
              ) : null}
            </div>
            <div>
              <Button size={"sm"} variant={"secondary"}>
                <Share2 />
                Share Link
              </Button>
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
      </div>
    </>
  );
};
