import React, { useState } from "react";
import {
  Bell,
  Check,
  X,
  Package,
  ShoppingCart,
  Truck,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Notification {
  id: string;
  type: "order" | "delivery" | "confirmation" | "payment" | "alert";
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionable: boolean;
}

interface NotificationPanelProps {
  notifications?: Notification[];
  userRole?: "buyer" | "seller" | "delivery";
  onNotificationAction?: (
    id: string,
    action: "accept" | "dismiss" | "view",
  ) => void;
}

const NotificationPanel = ({
  notifications = defaultNotifications,
  userRole = "delivery",
  onNotificationAction = () => {},
}: NotificationPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeNotifications, setActiveNotifications] =
    useState<Notification[]>(notifications);

  const unreadCount = activeNotifications.filter(
    (notification) => !notification.read,
  ).length;

  const handleAction = (id: string, action: "accept" | "dismiss" | "view") => {
    onNotificationAction(id, action);

    if (action === "dismiss") {
      setActiveNotifications((prev) =>
        prev.filter((notification) => notification.id !== id),
      );
    } else if (action === "view" || action === "accept") {
      setActiveNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification,
        ),
      );
    }
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-5 w-5 text-blue-500" />;
      case "delivery":
        return <Truck className="h-5 w-5 text-green-500" />;
      case "confirmation":
        return <Check className="h-5 w-5 text-purple-500" />;
      case "payment":
        return <Package className="h-5 w-5 text-yellow-500" />;
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full max-w-sm bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-xl font-bold">Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full px-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </CardHeader>
      <CardDescription className="px-6 text-sm text-gray-500">
        {userRole === "buyer" && "Track your orders and delivery status"}
        {userRole === "seller" && "Manage your orders and confirmations"}
        {userRole === "delivery" && "View available delivery jobs and updates"}
      </CardDescription>

      <ScrollArea className={`px-1 ${isExpanded ? "h-96" : "h-64"}`}>
        <CardContent className="pt-4">
          {activeNotifications.length === 0 ? (
            <div className="flex h-32 items-center justify-center">
              <p className="text-center text-sm text-gray-500">
                No notifications at this time
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative rounded-lg border p-4 ${!notification.read ? "bg-blue-50 border-blue-200" : "bg-white"}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">
                        {notification.title}
                      </h4>
                      <p className="mt-1 text-xs text-gray-600">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>

                        {notification.actionable && (
                          <div className="flex space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 w-7 p-0"
                                    onClick={() =>
                                      handleAction(notification.id, "accept")
                                    }
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Accept</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 w-7 p-0"
                                    onClick={() =>
                                      handleAction(notification.id, "dismiss")
                                    }
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Dismiss</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </ScrollArea>

      <Separator />

      <CardFooter className="flex justify-between pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setActiveNotifications((prev) =>
              prev.map((n) => ({ ...n, read: true })),
            )
          }
        >
          Mark all as read
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveNotifications([])}
        >
          Clear all
        </Button>
      </CardFooter>
    </Card>
  );
};

const defaultNotifications: Notification[] = [
  {
    id: "1",
    type: "delivery",
    title: "New Delivery Job Available",
    message: "Order #1234 is ready for pickup from Seller Electronics Store.",
    time: "5 minutes ago",
    read: false,
    actionable: true,
  },
  {
    id: "2",
    type: "order",
    title: "Order Status Update",
    message: "Order #1122 has been confirmed by the seller.",
    time: "30 minutes ago",
    read: false,
    actionable: false,
  },
  {
    id: "3",
    type: "confirmation",
    title: "Delivery Confirmation Needed",
    message:
      "Please confirm delivery of order #9876 to complete the transaction.",
    time: "2 hours ago",
    read: true,
    actionable: true,
  },
  {
    id: "4",
    type: "payment",
    title: "Payment Released",
    message: "Payment for order #5432 has been released to your account.",
    time: "1 day ago",
    read: true,
    actionable: false,
  },
  {
    id: "5",
    type: "alert",
    title: "Delivery Deadline Approaching",
    message: "Order #7890 needs to be delivered within the next 3 hours.",
    time: "3 hours ago",
    read: false,
    actionable: true,
  },
];

export default NotificationPanel;
