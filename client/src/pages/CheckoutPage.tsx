import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

const CheckoutPage = () => {
  const [location, navigate] = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    deliveryLocation: ""
  });

  const orderSummary = {
    subtotal: 1.50,
    deliveryFee: 20.00,
    total: 21.50
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process order
    navigate('/admin');
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