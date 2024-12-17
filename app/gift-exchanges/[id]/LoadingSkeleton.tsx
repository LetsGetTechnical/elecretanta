import { Card, CardContent, CardHeader } from "@/components/Card/card";
import { Skeleton } from "@/components/Skeleton/Skeleton";

const SkeletonCard = () => (
  <Card className="w-full">
    <CardHeader className="rounded-xl">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-32" />
      </div>
    </CardHeader>
    <CardContent className="pt-6 space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

export const LoadingSkeleton = () => (
  <main className="h-screen">
    <section className="mx-auto flex flex-col gap-4 px-4 md:px-16 lg:px-32 xl:px-52 pt-12">
      {/* Header Navigation */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-8">
        <Skeleton className="w-36 h-36 rounded-xl flex-shrink-0" />
        <div className="w-full space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-9 w-28" />
          </div>
          <div className="border-t pt-4">
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generic Layout */}
      <div className="flex flex-row w-full pt-12 gap-8 items-start">
        <SkeletonCard />
        <div className="flex flex-col gap-4 w-full max-w-md">
          <SkeletonCard />
        </div>
      </div>
    </section>
  </main>
);
