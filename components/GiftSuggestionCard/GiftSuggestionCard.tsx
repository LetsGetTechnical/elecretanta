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
    <Card>
      <CardHeader>
        <CardTitle>Name of Gift</CardTitle>
        <CardDescription>Description of gift.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li>reason #1 for gift suggestion</li>
          <li>reason #2 for gift suggestion</li>
        </ul>
      </CardContent>
      <CardFooter>
        <div>
          <Button>View</Button>
          <Button>Not This</Button>
        </div>
        <Button>Select Gift</Button>
      </CardFooter>
    </Card>
  );
};

export default GiftSuggestionCard;
