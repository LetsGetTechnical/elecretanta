import { GiftExchange } from "@/app/types/giftExchange";
import { formatDate } from "@/lib/utils";
import {
  ChevronLeft,
  Settings,
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
        <Link
          href={`/gift-exchanges/${giftExchangeData.id}/edit`}
          className="flex items-center gap-1 text-sm"
        >
          <Settings size={16} strokeWidth={2.25} />
          <span>Settings</span>
        </Link>
      </div>

      <section className="flex flex-col grow-0 gap-8 sm:flex-row">
        <div className="w-36 h-36 grow-0 shrink-0">
          <img
            className="w-full h-full rounded-xl ring-4 ring-white"
            src={giftExchangeData.group_image}
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
          </div>

          <div className="flex sm:flex-row flex-wrap border-t pt-2 gap-4 sm:gap-16">
            <div className="flex items-center gap-2 basis-full sm:basis-auto">
              {getStatusIcon(giftExchangeData.status)}
              <p className="text-md font-semibold">
                {getStatusText(giftExchangeData.status)}
              </p>
            </div>
            <div className="basis-full sm:basis-auto">
              <p className="text-lg font-semibold">Gift Budget</p>
              <p className="text-lg text-primary-foreground/80">
                ${giftExchangeData.budget}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Draw date</p>
              <p className="text-lg text-primary-foreground/80">
                {formatDate(giftExchangeData.drawing_date)}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Exchange Date</p>
              <p className="text-lg text-primary-foreground/80">
                {formatDate(giftExchangeData.exchange_date)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
