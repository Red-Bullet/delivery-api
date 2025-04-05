import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bell } from "lucide-react";
import Dashboard from "./Dashboard";
import NotificationPanel from "./NotificationPanel";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  const [userRole, setUserRole] = useState("buyer"); // Default role is buyer
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Mock notification count

  // Mock user data
  const userData = {
    buyer: {
      name: "John Doe",
      orders: [
        {
          id: "ORD-001",
          product: "Smartphone",
          status: "pending_delivery",
          seller: "Tech Store",
          price: 599,
        },
        {
          id: "ORD-002",
          product: "Headphones",
          status: "delivered",
          seller: "Audio World",
          price: 129,
        },
      ],
    },
    seller: {
      name: "Tech Store",
      orders: [
        {
          id: "ORD-001",
          product: "Smartphone",
          status: "pending_delivery",
          buyer: "John Doe",
          price: 599,
        },
        {
          id: "ORD-003",
          product: "Laptop",
          status: "pending_confirmation",
          buyer: "Jane Smith",
          price: 1299,
        },
      ],
    },
    delivery: {
      name: "Mike Carrier",
      availableJobs: [
        {
          id: "ORD-001",
          product: "Smartphone",
          status: "pending_delivery",
          seller: "Tech Store",
          buyer: "John Doe",
          price: 599,
        },
      ],
      activeDeliveries: [
        {
          id: "ORD-004",
          product: "Tablet",
          status: "in_transit",
          seller: "Tech Store",
          buyer: "Alice Johnson",
          price: 349,
        },
      ],
    },
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New Order Available",
      message: "Order #ORD-001 is ready for delivery",
      time: "10 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Order Confirmed",
      message: "Buyer confirmed delivery of order #ORD-002",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Payment Released",
      message: "Payment for order #ORD-002 has been released",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 4,
      title: "New Order",
      message: "You have a new order #ORD-003 pending confirmation",
      time: "3 hours ago",
      read: true,
    },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (notificationCount > 0) {
      setNotificationCount(0); // Mark all as read when opening
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Delivery Service Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-accent relative"
              >
                <Bell className="h-6 w-6" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    {notificationCount}
                  </Badge>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 z-50">
                  <NotificationPanel notifications={notifications} />
                </div>
              )}
            </div>
            <div className="text-sm">
              <div className="font-medium">
                {userData[userRole as keyof typeof userData].name}
              </div>
              <div className="text-muted-foreground capitalize">{userRole}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Role Selector */}
        <div className="mb-6">
          <Tabs defaultValue={userRole} onValueChange={setUserRole}>
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="buyer">Buyer</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
              <TabsTrigger value="delivery">Delivery Person</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Dashboard Content */}
        <Dashboard
          userRole={userRole}
          userData={userData[userRole as keyof typeof userData]}
        />
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2023 Delivery Service Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
