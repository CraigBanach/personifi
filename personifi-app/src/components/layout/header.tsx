import { Button } from "@/components/ui/button";
import { auth0 } from "@/lib/auth0";

const Header = async () => {
  const session = await auth0.getSession();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex flex-1 items-center justify-end gap-4">
        <nav className="flex items-center gap-2">
          {session && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-finance-red text-finance-red hover:bg-finance-red-dark hover:text-finance-red-light"
            >
              <a href="/auth/logout">Logout</a>
            </Button>
          )}
          {!session && (
            <Button
              asChild
              size="lg"
              className="bg-finance-green hover:bg-finance-green-dark"
            >
              <a href="/auth/login">Login</a>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
