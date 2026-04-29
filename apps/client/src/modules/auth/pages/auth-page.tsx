import { Navigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { GalleryVerticalEnd } from "lucide-react"
import { AuthForm } from "@/modules/auth/components/auth-form"

const AuthPage = () => {

  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            GitHub Board
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/banner.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default AuthPage;
