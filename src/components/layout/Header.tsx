import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

function Header() {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/"); // 로그아웃 후 홈으로 이동
  };

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
          {user && (
            <Button asChild variant="ghost">
              <Link to="/new-post">New Post</Link>
            </Button>
          )}

          {user ? (
            <>
              <span className="text-sm text-gray-600">
                {user.email}
              </span>
              <Button onClick={handleSignOut} variant="outline">
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="default">
                <Link to="/sign-in">로그인</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/signup">회원가입</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
