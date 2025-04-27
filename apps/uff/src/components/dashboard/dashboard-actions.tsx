export default function DashboardActions() {
  return (
    <div className="bg-background4 p-4 rounded-xl">
      <p className="text-3xl text-white mb-8">What you can do here?</p>
      <div className="grid grid-cols-4 gap-4">
        <ActionCard
          title="Find your first friend"
          description="Connect with people before classes even start."
        />
        <ActionCard
          title="Explore campus life"
          description="Stay updated with events, meetups, and student activities."
        />
        <ActionCard
          title="Join communities"
          description="Discover groups based on your interests and major."
        />
        <ActionCard
          title="Chat & Share"
          description="Talk, post, and react just like on your favorite socials."
        />
      </div>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  description: string;
}

function ActionCard({ title, description }: ActionCardProps) {
  return (
    <div className="bg-background2 rounded-3xl">
      <div className="bg-primary p-3 rounded-full -mt-4">
        <p className="text-white text-lg font-medium text-center">{title}</p>
      </div>
      <div className="p-4">
        <p className="text-white text-sm">{description}</p>
      </div>
    </div>
  );
}
