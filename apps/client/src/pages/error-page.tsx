import { useRouteError } from 'react-router';
import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : 'An unexpected error occurred.';

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="flex items-center gap-8">
        <span className="text-8xl font-bold tracking-tight">500</span>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
            <p className="text-muted-foreground mt-1 max-w-xs">{message}</p>
          </div>
          <Button variant="outline" className="w-fit" onClick={() => window.location.reload()}>
            Reload page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
