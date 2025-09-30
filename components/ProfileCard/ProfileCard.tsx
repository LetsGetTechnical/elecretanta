// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX } from 'react';
import { Cake, CircleX, Compass, Heart, Pencil } from 'lucide-react';
import { Progress } from '@/components/Progress/progress';
import Avatar from '@/components/Avatar/Avatar';
import { Button } from '@/components/Button/button';
import { Badge } from '@/components/Badge/Badge';
import { Profile } from '@/app/types/profile';
import { useRouter } from 'next/navigation';

interface ProfileCardProps {
  profile: Profile | null;
  showEditButton?: boolean;
}
/**
 * The ProfileCard component.
 * @param {object} props - The function props.
 * @param {Profile} props.profile - The profile props are passed.
 * @param {boolean} props.showEditButton  - Option for edit button.
 * @returns {JSX.Element} - The details of user profile.
 */
const ProfileCard = ({
  profile,
  showEditButton = false,
}: ProfileCardProps): JSX.Element => {
  const router = useRouter();

  /**
   * Allows user to edit profile
   * @returns {void} - modify user access for editing profile
   */
  const handleEditProfile = (): void => {
    router.push('/onboarding?editing=true');
  };
  /**
   * Capitializes Display Name
   * @param {string} displayName - The user display name
   * @returns {string} - The user's display name capitialized
   */
  const formatDisplayName = (displayName: string): string => {
    const formattedDisplayName = displayName.split(' ').map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return formattedDisplayName.join(' ');
  };
  /**
   * Capitializes Catergory Name
   * @param {string} category - The gift category
   * @returns {string} - The capitialized version of gift category
   */
  const formatCategory = (category: string): string => {
    const categories = category.split('&');
    const formattedCategories = categories.map((categoryItem) => {
      const trimmedCategoryItem = categoryItem.trim();
      const firstLetter = trimmedCategoryItem.charAt(0).toUpperCase();
      const restOfCategory = trimmedCategoryItem.slice(1);
      return `${firstLetter}${restOfCategory}`;
    });
    return formattedCategories.join(' & ');
  };
  /**
   * Renders options for user gift preferences
   * @param {string} preferenceRight - The preference to the left indicator
   * @param {string} preferenceLeft - The preference to the right indicator
   * @param {number | undefined} preference_value - Current user preference
   * @param  {string} testidPrefix - Test prefix
   * @returns { JSX.Element } - The value and name of preference options
   */
  const renderPreference = (
    preferenceRight: string,
    preferenceLeft: string,
    preference_value: number | undefined,
    testidPrefix: string,
  ): JSX.Element => {
    if (!preference_value) {
      return (
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between">
            <div data-testid={`${testidPrefix}-left-no-value`}>
              {preferenceLeft}
            </div>
            <div data-testid={`${testidPrefix}-right-no-value`}>
              {preferenceRight}
            </div>
          </div>
          <Progress indicatorClassName="bg-[#E8577D]" value={0} />
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between">
          <div
            data-testid={`${testidPrefix}-left`}
            className={preference_value <= 50 ? 'font-bold' : ''}
          >
            {preferenceLeft}
          </div>
          <div
            data-testid={`${testidPrefix}-right`}
            className={preference_value >= 50 ? 'font-bold' : ''}
          >
            {preferenceRight}
          </div>
        </div>
        <Progress
          data-testid={`${testidPrefix}-progress`}
          data-value={preference_value}
          indicatorClassName="bg-[#E8577D]"
          value={preference_value}
        />
      </div>
    );
  };

  return (
    <article className="text-white">
      <div className="flex items-center rounded-t-2xl justify-between py-5 px-9 bg-groupCardGreen">
        <div className="flex items-center gap-4">
          <Avatar data-testid="avatar" userAvatar={profile?.avatar} />
          <div>
            <h1 data-testid="profileName" className="text-lg font-bold">
              {formatDisplayName(profile?.display_name || 'No Name Provided')}
            </h1>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Cake className="text-[#92AEA9]" size={16} />
              <span data-testid="ageGroup" className="text-sm text-[#EDE6DF]">
                {profile?.age_group}
              </span>
            </div>
          </div>
        </div>
        {showEditButton && (
          <Button
            data-testid="editProfileButton"
            className="bg-[#C5DBB2] text-black flex items-center gap-2 text-sm font-bold rounded-xl hover:bg-[#E4ECD9]"
            onClick={handleEditProfile}
          >
            <Pencil size={16} /> Edit Profile
          </Button>
        )}
      </div>
      <div className="bg-[#12433A] rounded-b-2xl grid grid-cols-1 lg:grid-cols-[minmax(550px,2fr)_minmax(200px,1fr)] gap-12 px-9 py-7">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2 font-bold text-[#FFD17C]">
              <Heart size={16} strokeWidth={2} /> Interests & Hobbies
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile?.categories &&
                profile?.categories.map((category) => {
                  const categoryName = formatCategory(category);
                  return (
                    <Badge
                      key={category}
                      className="text-sm py-1 px-2.5 rounded-xl bg-[#DBDBB2] text-[#292913]"
                    >
                      {categoryName}
                    </Badge>
                  );
                })}
            </div>
            <p data-testid="hobbies" className="text-sm">
              {profile?.hobbies}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="flex items-center gap-3 font-bold text-[#FDDEDE]">
              <CircleX size={16} strokeWidth={2} /> Please avoid
            </h2>
            <p data-testid="avoid" className="text-sm">
              {profile?.avoid}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="flex items-center gap-2 font-bold mb-2 text-[#E8577D]">
            <Compass size={16} strokeWidth={2} /> Gift Styles
          </h2>
          {renderPreference(
            'Whimsical',
            'Practical',
            profile?.practical_whimsical,
            'practicalWhimsical',
          )}
          {renderPreference(
            'Adventurous',
            'Cozy',
            profile?.cozy_adventurous,
            'cozyAdventurous',
          )}
          {renderPreference(
            'Luxurious',
            'Minimal',
            profile?.minimal_luxurious,
            'minimalLuxurious',
          )}
        </div>
      </div>
    </article>
  );
};

export default ProfileCard;
