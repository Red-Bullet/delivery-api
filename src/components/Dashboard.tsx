import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Bell, Package, ShoppingBag, Truck, User } from "lucide-react";
import OrderStatusCard from "./OrderStatusCard";
import NotificationPanel from "./NotificationPanel";

interface DashboardProps {
  userRole?: "buyer" | "seller" | "delivery";
  userName?: string;
}

const Dashboard = ({
  userRole = "buyer",
  userName = "John Doe",
}: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<string>(userRole);

  // Mock data for demonstration
  const buyerOrders = [
    {
      id: "ORD-001",
      product: "Wireless Headphones",
      status: "delivered",
      price: 89.99,
      seller: "Audio Tech Inc.",
      deliveryPerson: "Mike Johnson",
    },
    {
      id: "ORD-002",
      product: "Smart Watch",
      status: "in_transit",
      price: 199.99,
      seller: "Gadget World",
      deliveryPerson: "Sarah Smith",
    },
    {
      id: "ORD-003",
      product: "Bluetooth Speaker",
      status: "pending_confirmation",
      price: 59.99,
      seller: "Sound Systems Ltd",
      deliveryPerson: null,
    },
  ];

  const sellerOrders = [
    {
      id: "ORD-004",
      product: "Laptop Stand",
      status: "pending_confirmation",
      price: 29.99,
      buyer: "Emma Wilson",
      deliveryPerson: null,
    },
    {
      id: "ORD-005",
      product: "Mechanical Keyboard",
      status: "confirmed",
      price: 119.99,
      buyer: "David Brown",
      deliveryPerson: null,
    },
    {
      id: "ORD-001",
      product: "Wireless Headphones",
      status: "delivered",
      price: 89.99,
      buyer: "John Doe",
      deliveryPerson: "Mike Johnson",
    },
  ];

  const deliveryJobs = [
    {
      id: "ORD-002",
      product: "Smart Watch",
      status: "in_transit",
      price: 199.99,
      buyer: "John Doe",
      seller: "Gadget World",
      commission: 15.0,
    },
    {
      id: "ORD-005",
      product: "Mechanical Keyboard",
      status: "available",
      price: 119.99,
      buyer: "David Brown",
      seller: "Tech Accessories",
      commission: 10.0,
    },
    {
      id: "ORD-006",
      product: "Wireless Mouse",
      status: "available",
      price: 49.99,
      buyer: "Lisa Chen",
      seller: "Computer Peripherals",
      commission: 5.0,
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "order_update",
      message: "Your order ORD-002 is now in transit",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "delivery_confirmation",
      message: "Please confirm delivery of ORD-001",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "payment_released",
      message: "Payment for ORD-003 has been processed",
      time: "1 day ago",
      read: true,
    },
  ];

  return (
    <div className="w-full h-full p-6 bg-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {userName}</p>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>

      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="buyer" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Buyer
          </TabsTrigger>
          <TabsTrigger value="seller" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Seller
          </TabsTrigger>
          <TabsTrigger value="delivery" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Delivery
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <TabsContent value="buyer" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Orders</CardTitle>
                  <CardDescription>
                    Track and manage your purchases
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {buyerOrders.map((order) => (
                    <OrderStatusCard
                      key={order.id}
                      orderId={order.id}
                      product={order.product}
                      status={order.status}
                      price={order.price}
                      seller={order.seller}
                      deliveryPerson={order.deliveryPerson}
                      userRole="buyer"
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seller" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Orders to Fulfill</CardTitle>
                  <CardDescription>
                    Manage your sales and shipments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sellerOrders.map((order) => (
                    <OrderStatusCard
                      key={order.id}
                      orderId={order.id}
                      product={order.product}
                      status={order.status}
                      price={order.price}
                      buyer={order.buyer}
                      deliveryPerson={order.deliveryPerson}
                      userRole="seller"
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delivery" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Jobs</CardTitle>
                  <CardDescription>
                    View available and current delivery assignments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deliveryJobs.map((job) => (
                    <OrderStatusCard
                      key={job.id}
                      orderId={job.id}
                      product={job.product}
                      status={job.status}
                      price={job.price}
                      buyer={job.buyer}
                      seller={job.seller}
                      commission={job.commission}
                      userRole="delivery"
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Stay updated on your activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationPanel notifications={notifications} />
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Dashboard;
