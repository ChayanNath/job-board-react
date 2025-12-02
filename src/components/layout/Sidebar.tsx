const navItems = [
  { label: "Dashboard" },
  { label: "Jobs" },
  { label: "Settings" },
];

export const Sidebar = () => {
  return (
    <aside aria-label="Sidebar" className="w-100">
      <div className="mb-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Navigation
      </div>

      <nav>
        <ul className="space-y-1 text-sm">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
