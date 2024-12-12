import ProfileCard from "@/components/ProfileCard/ProfileCard";

export default function PersonalProfile() {
  return (
    <section className="h-svh flex justify-center items-start py-16">
      <div className="max-w-5xl">
        <ProfileCard showEditButton />
      </div>
    </section>
  );
}
