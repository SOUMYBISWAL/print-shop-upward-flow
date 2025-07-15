import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Printer, FileText, Truck, Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Upload,
      title: "Upload Your Files",
      description: "PDF, Word, JPG, PNG and more",
    },
    {
      icon: Printer,
      title: "Customize Print Settings",
      description: "Color, paper type, size and more",
    },
    {
      icon: FileText,
      title: "Preview Your Document",
      description: "Check each page before ordering",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free delivery on orders above ₹99",
    },
  ];

  const templates = [
    {
      title: "Print your Rent Receipt",
      pages: "15 pages",
      rating: 3,
      reviews: 151,
      time: "8 MINS",
      discount: "68% OFF",
      price: "₹30",
      originalPrice: "₹95",
    },
    {
      title: "Print Your Aarti - Om Jai Jagdish Hare (English/Hindi)",
      pages: "3 pages",
      rating: 4,
      reviews: 87,
      time: "8 MINS",
      discount: "50% OFF",
      price: "₹19",
      originalPrice: "₹38",
    },
    {
      title: "Print Your Aarti - Laxmi Ji Ki Aarti (English/Hindi)",
      pages: "3 pages",
      rating: 4.5,
      reviews: 105,
      time: "8 MINS",
      discount: "50% OFF",
      price: "₹19",
      originalPrice: "₹38",
    },
    {
      title: "Print Your Aarti - Ganesh Ji Ki Aarti (English/Hindi)",
      pages: "3 pages",
      rating: 5,
      reviews: 92,
      time: "8 MINS",
      discount: "50% OFF",
      price: "₹19",
      originalPrice: "₹38",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-accent/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Quick and Easy Document Printing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload your files, customize your print settings, and get your prints delivered fast
          </p>
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg"
            onClick={() => navigate('/upload')}
          >
            <Upload className="mr-2 h-5 w-5" />
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center border-2 hover:border-primary/20 transition-colors">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-accent/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Print your Last Minute Needs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <div className="p-4">
                  <div className="text-sm text-primary mb-1">{template.pages}</div>
                  <h3 className="font-semibold mb-2 text-sm leading-tight">{template.title}</h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(template.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">({template.reviews})</span>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Clock className="h-3 w-3 mr-1" />
                    {template.time}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="bg-success text-success-foreground px-2 py-1 rounded text-xs">
                        {template.discount}
                      </span>
                      <span className="font-bold">{template.price}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {template.originalPrice}
                      </span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => navigate('/upload')}
                  >
                    Print
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Free Delivery on Orders Above ₹99</h2>
              <p className="text-primary-foreground/80">Upload your files now and get same day printing</p>
            </div>
            <Button 
              variant="secondary"
              size="lg"
              onClick={() => navigate('/upload')}
            >
              Start Printing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">PrintLite</h3>
              <p className="text-sm text-muted-foreground">
                Quick and affordable document printing service with fast delivery options.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Print Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Document Printing</li>
                <li>Photo Printing</li>
                <li>Bulk Orders</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Help & Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>FAQs</li>
                <li>Track Order</li>
                <li>Contact Us</li>
                <li>Refund Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Our Story</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 PrintLite. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;