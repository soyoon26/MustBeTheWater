import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthLayout from "@/components/layout/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";

function SignUp() {
  return (
    <AuthLayout>
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-1 text-left">
          <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
          <CardDescription>
            회원가입을 통해 특별한 혜택과 서비스를 이용할 수 있습니다
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>

      <p className="mt-6 text-sm text-center text-gray-600">
        이미 계정이 있나요?{" "}
        <Link
          to="/signin"
          className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
        >
          로그인하기
        </Link>
      </p>
    </AuthLayout>
  );
}

export default SignUp;
