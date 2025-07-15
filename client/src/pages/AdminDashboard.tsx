import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Check, Truck, Package } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type Order } from "@shared/schema";

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['/api/orders'],
    queryFn: () => apiRequest('/api/orders'),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number; status: string }) => {
      return apiRequest(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
    },
  });

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    updateStatusMutation.mutate({ orderId, status: newStatus });
  };

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "printing": return "bg-blue-500";
      case "shipped": return "bg-purple-500";
      case "delivered": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return Package;
      case "printing": return FileText;
      case "shipped": return Truck;
      case "delivered": return Check;
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
                  {orders.filter(o => o.status === "pending").length}
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
                  {orders.filter(o => o.status === "printing").length}
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
                      <h3 className="font-semibold">{order.orderId}</h3>
                      <Badge className={`${getStatusColor(order.status)} text-white`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground mb-1">{order.customerEmail}</p>
                    <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                  </div>

                  {/* Print Options & Address */}
                  <div>
                    <h4 className="font-medium mb-2">Print Options</h4>
                    <div className="text-sm space-y-1">
                      <p>Type: {order.printOptions.printType}</p>
                      <p>Paper: {order.printOptions.paperType}</p>
                      <p>Sides: {order.printOptions.printingSide}</p>
                      <p>Copies: {order.printOptions.copies}</p>
                    </div>
                    <h4 className="font-medium mt-4 mb-2">Delivery Address</h4>
                    <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-3">
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{parseFloat(order.totalAmount).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">{order.totalPages} pages</p>
                    </div>
                    
                    <Select 
                      value={order.status} 
                      onValueChange={(value) => updateOrderStatus(order.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="printing">Printing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Print Label
                      </Button>
                      {order.status === "pending" ? (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => updateOrderStatus(order.id, "printing")}
                        >
                          Start Printing
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => updateOrderStatus(order.id, "delivered")}
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