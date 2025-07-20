import React from "react";
import { Badge } from "@/components/ui/badge";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
}

function AuthLayout({ children, title, subtitle, badge }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        {(title || subtitle || badge) && (
          <div className="mb-6 text-center">
            {badge && (
              <Badge variant="secondary" className="mb-2">
                {badge}
              </Badge>
            )}
            {title && (
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            )}
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
