import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Check, Truck, Package } from "lucide-react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 (555) 987-6543"
      },
      files: [
        { name: "Presentation.pdf", size: "2.5 MB" },
        { name: "Handouts.pdf", size: "1.8 MB" }
      ],
      printOptions: {
        type: "Color",
        size: "A4",
        sides: "double",
        binding: "spiral"
      },
      deliveryAddress: "456 Oak Ave, Los Angeles, CA 90210",
      status: "Printing",
      amount: 7.00,
      pages: 25
    },
    {
      id: "ORD-002", 
      customer: {
        name: "Bob Johnson",
        email: "bob@example.com",
        phone: "+1 (555) 456-7890"
      },
      files: [
        { name: "Document.pdf", size: "1.2 MB" }
      ],
      printOptions: {
        type: "Black & White",
        size: "Letter",
        sides: "single",
        binding: "none"
      },
      deliveryAddress: "789 Pine Rd, Chicago, IL 60601",
      status: "Pending",
      amount: 7.00,
      pages: 8
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-500";
      case "Printing": return "bg-blue-500";
      case "Shipped": return "bg-purple-500";
      case "Delivered": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending": return Package;
      case "Printing": return FileText;
      case "Shipped": return Truck;
      case "Delivered": return Check;
      default: return Package;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage print orders and deliveries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === "Pending").length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Printing</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === "Printing").length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">
                  ₹{orders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}
                </p>
              </div>
              <Check className="h-8 w-8 text-success" />
            </div>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => {
            const StatusIcon = getStatusIcon(order.status);
            
            return (
              <Card key={order.id} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Order Info */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{order.id}</h3>
                      <Badge className={`${getStatusColor(order.status)} text-white`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground mb-1">{order.customer.email}</p>
                    <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                  </div>

                  {/* Files */}
                  <div>
                    <h4 className="font-medium mb-2">Files</h4>
                    <div className="space-y-1">
                      {order.files.map((file, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <FileText className="h-4 w-4 mr-2 text-primary" />
                          <span className="flex-1">{file.name}</span>
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Print Options & Address */}
                  <div>
                    <h4 className="font-medium mb-2">Print Options</h4>
                    <div className="text-sm space-y-1">
                      <p>Type: {order.printOptions.type}</p>
                      <p>Size: {order.printOptions.size}</p>
                      <p>Sides: {order.printOptions.sides}</p>
                      <p>Binding: {order.printOptions.binding}</p>
                    </div>
                    <h4 className="font-medium mt-4 mb-2">Delivery Address</h4>
                    <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-3">
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{order.amount.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">{order.pages} pages</p>
                    </div>
                    
                    <Select 
                      value={order.status} 
                      onValueChange={(value) => updateOrderStatus(order.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Printing">Printing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Print Label
                      </Button>
                      {order.status === "Pending" ? (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => updateOrderStatus(order.id, "Printing")}
                        >
                          Start Printing
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => updateOrderStatus(order.id, "Delivered")}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;