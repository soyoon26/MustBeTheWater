"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

export function SignInForm() {
  const { signIn, loading, error, setError } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // 이전 에러 초기화

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    await signIn(email, password);

    if (!useAuthStore.getState().error) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="block text-left">
          이메일
        </Label>
        <div className="relative">
          <Mail className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해 주세요."
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="block text-left">
          비밀번호
        </Label>
        <div className="relative">
          <Lock className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해 주세요."
            className="pl-10 pr-12"
            required
          />
          <button
            type="button"
            className="absolute text-gray-400 transform -translate-y-1/2 bg-transparent border-none right-3 top-1/2 hover:text-gray-600 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "로그인 중" : "로그인"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}
