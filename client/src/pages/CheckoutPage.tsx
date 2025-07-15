import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type UploadedFile } from "@/lib/fileUpload";

interface PrintSettings {
  paperType: string;
  printType: string;
  printingSide: string;
  pageRange: string;
  copies: number;
  totalPages: number;
  price: number;
  files: UploadedFile[];
}

const CheckoutPage = () => {
  const [location, navigate] = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    deliveryLocation: ""
  });
  const [printSettings, setPrintSettings] = useState<PrintSettings | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const deliveryFee = 20.00;

  useEffect(() => {
    // Get print settings from localStorage
    const settingsData = localStorage.getItem('printSettings');
    if (settingsData) {
      setPrintSettings(JSON.parse(settingsData));
    } else {
      navigate('/print-settings');
    }
  }, [navigate]);

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      return apiRequest('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    },
    onSuccess: (order) => {
      // Create order files
      if (printSettings) {
        printSettings.files.forEach(file => {
          apiRequest('/api/order-files', {
            method: 'POST',
            body: JSON.stringify({
              orderId: order.id,
              fileName: file.name,
              fileSize: file.size.toString(),
              fileKey: file.key,
              fileType: file.type,
            }),
          });
        });
      }
      
      // Clear localStorage
      localStorage.removeItem('uploadedFiles');
      localStorage.removeItem('printSettings');
      
      toast({
        title: "Order placed successfully!",
        description: `Order ${order.orderId} has been created.`,
      });
      
      navigate('/admin');
    },
    onError: (error) => {
      toast({
        title: "Order failed",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!printSettings) {
      toast({
        title: "Missing print settings",
        description: "Please go back and configure your print settings.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.fullName || !formData.mobile || !formData.deliveryLocation) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      orderId: `ORD-${Date.now()}`,
      customerName: formData.fullName,
      customerEmail: `${formData.mobile}@example.com`, // Placeholder email
      customerPhone: formData.mobile,
      deliveryAddress: formData.deliveryLocation,
      status: "pending",
      totalAmount: (printSettings.price + deliveryFee).toFixed(2),
      totalPages: printSettings.totalPages,
      printOptions: {
        paperType: printSettings.paperType,
        printType: printSettings.printType,
        printingSide: printSettings.printingSide,
        pageRange: printSettings.pageRange,
        copies: printSettings.copies,
      },
    };

    createOrderMutation.mutate(orderData);
    setIsSubmitting(false);
  };

  if (!printSettings) {
    return <div>Loading...</div>;
  }

  const orderSummary = {
    subtotal: printSettings.price,
    deliveryFee: deliveryFee,
    total: printSettings.price + deliveryFee
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Details */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Delivery Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryLocation">Delivery Location</Label>
                  <Select value={formData.deliveryLocation} onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryLocation: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select delivery location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cutm-bhubaneswar">CUTM Bhubaneswar</SelectItem>
                      <SelectItem value="bhubaneswar-city">Bhubaneswar City</SelectItem>
                      <SelectItem value="cuttack">Cuttack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{orderSummary.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{orderSummary.deliveryFee.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-6"
                onClick={handleSubmit}
              >
                Continue to Payment
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;