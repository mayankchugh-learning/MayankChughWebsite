import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="glass p-12 rounded-2xl text-center max-w-md mx-4 shadow-2xl shadow-black/20">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-20 w-20 text-destructive/80" />
        </div>
        
        <h1 className="text-5xl font-bold mb-4 font-mono">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. 
          Return to the matrix.
        </p>

        <Link href="/">
          <a className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20">
            Return Home
          </a>
        </Link>
      </div>
    </div>
  );
}
