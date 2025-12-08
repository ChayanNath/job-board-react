import { Outlet } from "react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex h-full w-28 shrink-0 border-r border-border bg-card">
        <div className="h-full w-full overflow-y-auto p-4">
          <Sidebar />
        </div>
      </div>

      <div className="flex flex-1 flex-col h-full">
        <div className="border-b border-border bg-card px-4 py-3">
          <Header />
        </div>

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
