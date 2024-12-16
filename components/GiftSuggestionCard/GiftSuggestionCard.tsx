import { SquareArrowOutUpRight, ThumbsDown } from "lucide-react";
import { Button } from "../Button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Card/card";

const GiftSuggestionCard = () => {
  return (
    <Card className="bg-giftSuggestionsCardBackground h-80 w-80">
      <div className="flex justify-between m-4">
        <p className="text-xs w-24 h-7 flex items-center justify-center font-semibold bg-giftSuggestionTextBackground text-giftSuggestionTextGreen">
          95% Match
        </p>
        <p className="text-sm font-semibold text-giftSuggestionPriceGreen">
          $29.95
        </p>
      </div>
      <CardHeader className="p-0 mx-4">
        <CardTitle className="text-base font-bold">Name of Gift</CardTitle>
        <CardDescription className="text-sm">
          Description of gift.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="text-xs mt-4">
          <li>reason #1 for gift suggestion</li>
          <li>reason #2 for gift suggestion</li>
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex justify-between w-full">
          <Button className="text-sm">
            <SquareArrowOutUpRight /> View
          </Button>
          <Button className="text-sm">
            <ThumbsDown />
            Not This
          </Button>
        </div>
        <Button className="w-full text-sm">Select Gift</Button>
      </CardFooter>
    </Card>
  );
};

export default GiftSuggestionCard;
