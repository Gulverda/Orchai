import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-4">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        
        <h1 className="text-6xl font-bold gradient-text">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Button asChild className="mt-6">
          <Link to="/" className="inline-flex items-center gap-2">
            <Home className="w-4 h-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
