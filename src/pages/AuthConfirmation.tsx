import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const AuthConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/sign-in');
    }, 5000); // 5초 후 로그인 페이지로 이동

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">이메일 인증 완료</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            회원가입이 성공적으로 완료되었습니다.
          </p>
          <p className="text-gray-500 mt-2">
            잠시 후 로그인 페이지로 이동합니다...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthConfirmation;
