import { UserNav } from "@/components/layout/user-nav";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { Sidebar } from "@/components/layout/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sidebar className="w-[240px]" />
      <div className="flex flex-1 items-center justify-end gap-4">
        <nav className="flex items-center gap-2">
          <ModeToggle />
          <UserNav />
        </nav>
      </div>
    </header>
  );
}
