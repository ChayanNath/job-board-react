import { ModeToggle } from "../mode-toggle";

export const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Job Board</h1>
        <p className="text-sm text-muted-foreground">
          Track your applications while sharpening your React skills.
        </p>
      </div>
      <ModeToggle />
    </header>
  );
};
