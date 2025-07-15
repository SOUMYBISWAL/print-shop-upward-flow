import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, Check, FileText } from "lucide-react";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const handleTrack = () => {
    // Mock order tracking
    setOrderDetails({
      id: "ORD-001",
      status: "Printing",
      customer: "Jane Smith",
      files: ["Presentation.pdf", "Handouts.pdf"],
      timeline: [
        { status: "Order Placed", completed: true, time: "2025-01-13 10:30 AM" },
        { status: "Printing", completed: true, time: "2025-01-13 11:15 AM" },
        { status: "Quality Check", completed: false, time: "" },
        { status: "Shipped", completed: false, time: "" },
        { status: "Delivered", completed: false, time: "" }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">Enter your order ID to track the status</p>
        </div>

        <Card className="p-6 mb-8">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="orderId">Order ID</Label>
              <Input
                id="orderId"
                placeholder="Enter your order ID (e.g. ORD-001)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleTrack}>Track Order</Button>
            </div>
          </div>
        </Card>

        {orderDetails && (
          <Card className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Order {orderDetails.id}</h2>
                <Badge className="bg-blue-500 text-white">
                  <FileText className="h-3 w-3 mr-1" />
                  {orderDetails.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">Customer: {orderDetails.customer}</p>
              <p className="text-muted-foreground">Files: {orderDetails.files.join(", ")}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Order Timeline</h3>
              {orderDetails.timeline.map((step: any, index: number) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.completed && <Check className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.status}
                    </p>
                    {step.time && (
                      <p className="text-sm text-muted-foreground">{step.time}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;