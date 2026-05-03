import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="flex items-center gap-8">
        <span className="text-8xl font-bold tracking-tight">404</span>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
            <p className="text-muted-foreground mt-1 max-w-xs">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <Button variant="outline" className="w-fit" onClick={() => navigate("/")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
