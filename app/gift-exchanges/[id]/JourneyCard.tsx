import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Card/card";
import { Gift, UserCircle, Sparkles, PartyPopper } from "lucide-react";

export const JourneyCard = () => {
  const journeySteps = [
    {
      icon: <Gift className="text-groupCardGreen" />,
      title: "Secret Match",
      description: "On December 1st, we'll review who you're gifting to",
    },
    {
      icon: <UserCircle className="text-groupCardGreen" />,
      title: "Profile Insights",
      description:
        "See their interests and preferences to guide your gift choice. Update your own profile anytime to help your Secret Santa",
    },
    {
      icon: <Sparkles className="text-groupCardGreen" />,
      title: "Smart Gift Ideas",
      description:
        "Our AI suggests personalized gifts based on their interests. Your feedback helps find the perfect match.",
    },
    {
      icon: <PartyPopper className="text-groupCardGreen" />,
      title: "Exchange Time",
      description: "Bring your wrapped gift to exchange on December 25th",
    },
  ];

  return (
    <Card className="w-full bg-groupCardGreen border-none">
      <CardHeader className="bg-groupCardGreen rounded-xl p-2">
        <CardTitle className="p-4 flex gap-2 items-center text-white font-bold">
          Your Gift Giving Journey
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col gap-6">
          {journeySteps.map((step, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                {step.icon}
              </div>
              <div className="flex flex-col items-start justify-start text-white w-full">
                <div className="text-lg font-semibold">{step.title}</div>
                <div className="text-sm">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
