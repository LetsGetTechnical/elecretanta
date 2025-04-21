import { Skeleton } from '@/components/Skeleton/Skeleton';

const LoadingCard = () => {
  return (
    <article className="text-white px-4">
      <div className="flex items-center rounded-t-2xl py-5 px-9 bg-groupCardGreen">
        <Skeleton className="w-full h-10 rounded-full" />
      </div>
      <div className="bg-[#12433A] rounded-b-2xl grid grid-cols-1 lg:grid-cols-[minmax(550px,2fr)_minmax(300px,1fr)] gap-12 pl-9 pr-28 py-7">
        <div className="flex flex-col gap-5">
          <Skeleton className="w-full h-10 rounded-md" />
          <Skeleton className="w-full h-10 rounded-md" />
          <Skeleton className="w-full h-10 rounded-md" />
        </div>
        <div className="flex flex-col gap-5">
          <Skeleton className="w-full h-10 rounded-md" />
          <Skeleton className="w-full h-10 rounded-md" />
          <Skeleton className="w-full h-10 rounded-md" />
        </div>
      </div>
    </article>
  );
};

export default LoadingCard;
