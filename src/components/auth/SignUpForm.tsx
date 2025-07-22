"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  KeyRound,
} from "lucide-react";

export function SignUpForm() {
  const { signUp, sendOtp, verifyOtp, loading, error: authError } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    agreeToTerms: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);

  const isTimerActive = timeLeft > 0 && otpSent;

  useEffect(() => {
    if (!isTimerActive && otpSent) {
      setOtpError("인증 시간이 만료되었습니다. 인증 번호를 다시 발급받아주세요.");
      return;
    }

    if (isTimerActive) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [isTimerActive, otpSent]);

  const handleSendOtp = async () => {
    if (!formData.email) {
      setMessage("이메일을 먼저 입력해주세요.");
      return;
    }
    setMessage("");
    setOtpError("");

    try {
      await sendOtp(formData.email);
      setOtpSent(true);
      setTimeLeft(300); // 타이머 리셋
      setMessage("인증번호가 발송되었습니다. 이메일을 확인해주세요.");
    } catch (e: any) {
      setMessage(e.message);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp) {
      setOtpError("인증번호를 입력해주세요.");
      return;
    }
    setOtpError("");
    setMessage("");

    try {
      await verifyOtp(formData.email, formData.otp);
      setIsOtpVerified(true);
      setMessage("이메일 인증이 완료되었습니다.");
      setOtpSent(false); // 인증 성공 시 타이머 및 관련 UI 숨김
    } catch (err: any) {
      setOtpError("인증 번호가 올바르지 않습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setOtpError("");

    if (!isOtpVerified) {
      setMessage("이메일 인증을 먼저 완료해주세요.");
      return;
    }
    if (!formData.agreeToTerms) {
      setMessage("약관에 동의해주세요.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setPasswordError("");

    try {
      const signUpData = await signUp(
        formData.email,
        formData.password,
        formData.name
      );
      if (signUpData) {
        setMessage(
          "회원가입이 성공적으로 완료되었습니다! 로그인 페이지로 이동합니다."
        );
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      }
    } catch (err: any) {
      setMessage(err.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "otp" && otpError) setOtpError("");

    if (name === "confirmPassword" || name === "password") {
      const password = name === "password" ? value : formData.password;
      const confirmPassword =
        name === "confirmPassword" ? value : formData.confirmPassword;
      if (confirmPassword && password !== confirmPassword) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("");
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const isPasswordMismatch = passwordError && formData.confirmPassword;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 이름, 이메일, 비밀번호 등 기존 필드 생략 없이 전체 코드 포함 */}
      <div className="space-y-2">
        <Label htmlFor="name" className="block text-left">이름</Label>
        <div className="relative"><User className="absolute w-4 h-4 text-gray-400 left-3 top-3" /><Input id="name" name="name" type="text" placeholder="이름을 입력해 주세요." className="pl-10" value={formData.name} onChange={handleInputChange} required /></div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="block text-left">이메일</Label>
        <div className="flex gap-2">
          <div className="relative flex-grow"><Mail className="absolute w-4 h-4 text-gray-400 left-3 top-3" /><Input id="email" name="email" type="email" placeholder="이메일을 입력해 주세요." className="pl-10" value={formData.email} onChange={handleInputChange} required disabled={otpSent} /></div>
          <Button type="button" onClick={handleSendOtp} disabled={loading || isTimerActive}>{isTimerActive ? "재전송" : "인증번호 발송"}</Button>
        </div>
      </div>

      {otpSent && !isOtpVerified && (
        <div className="p-4 border rounded-md bg-gray-50">
          <Label htmlFor="otp" className="block text-left">인증번호</Label>
          <div className="flex items-center gap-2 mt-2">
            <div className="relative flex-grow"><KeyRound className="absolute w-4 h-4 text-gray-400 left-3 top-3" /><Input id="otp" name="otp" type="text" placeholder="6자리 인증번호" className="pl-10" value={formData.otp} onChange={handleInputChange} required disabled={!isTimerActive || loading} /></div>
            <div className={`text-sm font-medium ${isTimerActive ? "text-gray-600" : "text-red-500"}`}>{formatTime(timeLeft)}</div>
            <Button type="button" onClick={handleVerifyOtp} disabled={!isTimerActive || loading}>{loading ? "확인중" : "확인"}</Button>
          </div>
          {otpError && <p className="mt-2 text-sm text-red-500">{otpError}</p>}
        </div>
      )}

      {message && <Alert className={message.includes("완료") ? "border-green-500" : ""}><AlertDescription>{message}</AlertDescription></Alert>}
      
      <div className="space-y-2">
        <Label htmlFor="password" className="block text-left">비밀번호</Label>
        <div className="relative"><Lock className="absolute w-4 h-4 text-gray-400 left-3 top-3" /><Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="비밀번호를 입력해 주세요." className="pl-10 pr-12" value={formData.password} onChange={handleInputChange} required /><button type="button" className="absolute text-gray-400 transform -translate-y-1/2 bg-transparent border-none right-3 top-1/2 hover:text-gray-600 focus:outline-none" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="block text-left">비밀번호 확인</Label>
        <div className="relative"><Lock className="absolute w-4 h-4 text-gray-400 left-3 top-3" /><Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="비밀번호를 다시 입력해 주세요." className={`pl-10 pr-10 ${isPasswordMismatch ? "border-red-500" : ""}`} value={formData.confirmPassword} onChange={handleInputChange} required /><button type="button" className="absolute text-gray-400 transform -translate-y-1/2 bg-transparent border-none right-3 top-1/2 hover:text-gray-600 focus:outline-none" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
        {isPasswordMismatch && <p className="text-sm text-red-500">{passwordError}</p>}
      </div>

      {authError && !otpError && <Alert variant="destructive"><AlertDescription>{authError}</AlertDescription></Alert>}

      <div className="flex items-start space-x-2">
        <Checkbox id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onCheckedChange={(checked: boolean) => setFormData((prev) => ({ ...prev, agreeToTerms: checked }))} />
        <Label htmlFor="agreeToTerms" className="text-sm font-normal text-left">위 <Link to="/terms" className="text-blue-600 hover:underline">약관</Link>에 동의합니다.</Label>
      </div>
      <Button type="submit" className="w-full" disabled={!isOtpVerified || loading || !formData.agreeToTerms || !!passwordError}>{loading ? "계정 생성 중" : "계정 만들기"}<ArrowRight className="w-4 h-4 ml-2" /></Button>
    </form>
  );
}