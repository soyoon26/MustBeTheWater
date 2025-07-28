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
      {/* 
        - md:flex-row: 중간 크기 화면(768px) 이상에서는 가로로 배치
        - md:justify-between: 중간 크기 화면 이상에서는 양쪽 끝으로 정렬
        - flex-col: 기본(모바일)에서는 세로로 배치
        - items-center: 모든 화면 크기에서 아이템들을 중앙 정렬
        - space-y-4: 모바일에서 세로로 배치될 때 아이템 간의 상하 간격
        - md:space-y-0: 중간 크기 화면 이상에서는 상하 간격 제거
      */}
      <div className="container flex flex-col items-center justify-between px-4 py-4 mx-auto md:flex-row space-y-4 md:space-y-0">
        <Link to="/" className="text-2xl font-bold text-gray-900 whitespace-nowrap">
          MustBeTheWater
        </Link>
        {/* 
          - flex-wrap: 공간이 부족하면 버튼들이 다음 줄로 넘어가도록 설정
          - justify-center: 버튼들을 가운데 정렬
          - md:justify-end: 중간 크기 화면 이상에서는 오른쪽 끝으로 정렬
        */}
        <nav className="flex items-center justify-center flex-wrap gap-2 md:justify-end md:gap-4">
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
              <span className="text-sm text-gray-600 whitespace-nowrap">
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
