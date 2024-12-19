"use client";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { useEffect, useState } from "react";
import { Profile } from "@/app/types/profile";
import { useParams } from "next/navigation";
import LoadingCard from "@/app/profile/LoadingCard";

export default function UserProfile() {
  const params = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const id = params.id;
        const response = await fetch(`/api/profile/${id}`);
        const profile = await response.json();
        setProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [params.id]);

  if (isLoading) {
    return (
      <section className="h-svh flex justify-center items-start py-16">
        <div className="max-w-5xl">
          <LoadingCard />
        </div>
      </section>
    );
  }

  return (
    <section className="h-svh flex justify-center items-start py-16">
      <div className="max-w-5xl">
        {profile ? (
          <ProfileCard profile={profile} />
        ) : (
          <div className="text-gray-400 text-center">No profile found.</div>
        )}
      </div>
    </section>
  );
}
