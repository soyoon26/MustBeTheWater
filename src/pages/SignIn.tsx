import { SignInForm } from "@/components/auth/SignInForm";
import AuthLayout from "@/components/layout/AuthLayout";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <AuthLayout title="로그인">
      <SignInForm />
      <p className="mt-4 text-sm text-center text-gray-600">
        계정이 없으신가요?{" "}
        <Link
          to="/signup"
          className="font-medium text-blue-600 hover:underline"
        >
          회원가입
        </Link>
      </p>
    </AuthLayout>
  );
}
