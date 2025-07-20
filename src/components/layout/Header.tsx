import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          MustBeTheWater
        </Link>
        <nav className="flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link to="/">Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/new-post">New Post</Link>
          </Button>
          <Button asChild>
            <Link to="/signin">회원가입</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
