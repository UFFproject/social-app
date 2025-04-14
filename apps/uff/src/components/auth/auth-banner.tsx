export default function AuthBanner() {
  return (
    <div className="flex-1 p-4 hidden lg:block">
      <div className="w-full h-full bg-primary rounded-lg p-6 relative">
        <h1 className="text-primary-foreground text-3xl font-bold">
          Welcome to
          <br />
          University Friends Finder
        </h1>

        <p className="absolute bottom-6 text-xl font-medium text-primary-foreground">
          Connect your friends with ease ✨
        </p>
      </div>
    </div>
  );
}
