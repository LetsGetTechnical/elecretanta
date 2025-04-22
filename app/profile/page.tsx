'use client';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { useEffect, useState } from 'react';
import { Profile } from '@/app/types/profile';
import LoadingCard from '@/components/LoadingCard/LoadingCard';
import { ChevronLeft } from 'lucide-react';
import LinkCustom from '@/components/LinkCustom/LinkCustom';

export default function PersonalProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/profile');
        const profile = await response.json();
        setProfile(profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

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
    <section className="h-svh flex flex-col items-center py-16 px-4 md:px-16 lg:px-32 xl:px-52">
      <div className="flex flex-row w-full">
        <LinkCustom href="/dashboard">
          <ChevronLeft size={16} strokeWidth={2.25} />
          Back to Dashboard
        </LinkCustom>
      </div>
      <div className="max-w-5xl">
        {profile ? (
          <ProfileCard profile={profile} showEditButton />
        ) : (
          <div className="text-gray-400 text-center">No profile found.</div>
        )}
      </div>
    </section>
  );
}
