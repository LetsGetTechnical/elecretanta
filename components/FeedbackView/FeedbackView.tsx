import { ChevronLeft } from "lucide-react";

const FeedbackView = ({
  allSuggestions,
  gift,
  handleFeedback,
}: {
  allSuggestions: {
    id: string;
    matchScore: number;
    price: string;
    title: string;
    description: string;
    matchReasons: string[];
  };
  gift: {
    matchScore: number;
    price: string;
    title: string;
    description: string;
    matchReasons: string[];
  };
  handleFeedback: () => void;
}) => {
  console.log(allSuggestions);
  console.log(gift);
  return (
    <div className="flex flex-col m-4">
      <ChevronLeft className="hover:cursor-pointer" onClick={handleFeedback} />
      <h1 className="text-sm text-[#21443D] font-bold mx-auto mt-4">
        Give Us Feedback
      </h1>
      <div className="flex flex-col justify-center mt-4 gap-4">
        {[
          { title: "Too Expensive", subtitle: "Show lower price range" },
          { title: "Not Their Style", subtitle: "Try different interests" },
          { title: "They Might Have This", subtitle: "Show alternatives" },
        ].map(({ title, subtitle }, index) => (
          <button
            key={index}
            className="bg-[#E5ECDF] w-72 h-20 rounded-xl hover:bg-[#DBE2D5]"
          >
            <p className="text-sm font-bold">{title}</p>
            <p className="text-sm">{subtitle}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeedbackView;
