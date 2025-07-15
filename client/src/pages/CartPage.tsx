import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useLocation } from "wouter";

interface PrintSettings {
  paperType: string;
  printType: string;
  printingSide: string;
  pageRange: string;
  copies: number;
  totalPages: number;
  price: number;
  files: any[];
}

const CartPage = () => {
  const [location, navigate] = useLocation();
  const [printSettings, setPrintSettings] = useState<PrintSettings | null>(null);

  useEffect(() => {
    // Get print settings from localStorage
    const settingsData = localStorage.getItem('printSettings');
    if (settingsData) {
      setPrintSettings(JSON.parse(settingsData));
    } else {
      navigate('/print-settings');
    }
  }, [navigate]);

  if (!printSettings) {
    return <div>Loading...</div>;
  }

  const subtotal = printSettings.price;
  const deliveryFee = 20.00;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Button variant="outline">Clear Cart</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">Print Job ({printSettings.files.length} files)</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">₹{printSettings.price.toFixed(2)}</span>
                      <Button variant="ghost" size="sm" onClick={() => {
                        localStorage.removeItem('printSettings');
                        navigate('/print-settings');
                      }}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Paper: {printSettings.paperType === 'standard' ? 'Standard (70 GSM)' : 
                              printSettings.paperType === 'premium' ? 'Premium (80 GSM)' : 'Photo Paper'}</p>
                    <p>Print: {printSettings.printType === 'bw' ? 'Black & White' : 'Color'}</p>
                    <p>Side: {printSettings.printingSide === 'single' ? 'Single Sided' : 'Double Sided'}</p>
                    <p>Copies: {printSettings.copies}</p>
                    <p>Pages: {printSettings.totalPages}</p>
                    <p>Total Pages: {printSettings.totalPages * printSettings.copies}</p>
                    <p>Page Range: {printSettings.pageRange === 'all' ? 'All Pages' : 'Custom Range'}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-6"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;