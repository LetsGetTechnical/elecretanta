import { Button } from "@/components/Button/button";
import GroupCard from "@/components/GroupCard/GroupCard";
import Link from "next/link";

const Dashboard = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-4 md:px-16 lg:px-32 xl:px-52 h-40 pt-16">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <Button
          className="bg-primaryButtonYellow h-10 w-36 font-semibold text-sm"
          asChild
        >
          <Link href="/groups">Create Group</Link>
        </Button>
      </div>
      <div className="flex flex-col flex-grow px-4 md:px-16 lg:px-32 xl:px-52">
        <h2 className="font-semibold text-lg text-white mb-2">My Groups</h2>
        <GroupCard />
      </div>
    </section>
  );
};
export default Dashboard;
