import { Search, Upload, ShoppingCart, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold">PrintLite</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search for documents, templates and more"
                className="pl-10 pr-12"
              />
              <Button 
                size="sm" 
                variant="ghost" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                🎙️
              </Button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/upload')}
              className="flex items-center space-x-1"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Button>

            <Button 
              variant="ghost"
              onClick={() => navigate('/track')}
            >
              Track Order
            </Button>

            <Button 
              variant="ghost" 
              onClick={() => navigate('/cart')}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>

            <Button 
              variant="ghost"
              onClick={() => navigate('/admin')}
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;