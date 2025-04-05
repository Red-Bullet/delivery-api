import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Package,
  CheckCircle,
  XCircle,
  Truck,
  Clock,
  DollarSign,
} from "lucide-react";

export type OrderStatus =
  | "pending_seller_confirmation"
  | "confirmed"
  | "rejected"
  | "delivery_job_available"
  | "delivery_assigned"
  | "in_progress"
  | "package_picked_up"
  | "package_in_transit"
  | "package_arrived"
  | "awaiting_buyer_confirmation"
  | "delivery_confirmed"
  | "dispute"
  | "completed";

export type UserRole = "buyer" | "seller" | "delivery";

interface OrderStatusCardProps {
  orderId: string;
  orderDate: string;
  status: OrderStatus;
  userRole: UserRole;
  productName: string;
  price: number;
  sellerName?: string;
  buyerName?: string;
  deliveryPersonName?: string;
  estimatedDeliveryDate?: string;
  onConfirmOrder?: () => void;
  onRejectOrder?: () => void;
  onAcceptDeliveryJob?: () => void;
  onUpdateDeliveryStatus?: (status: OrderStatus) => void;
  onConfirmDelivery?: () => void;
  onReportIssue?: () => void;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  orderId = "ORD-12345",
  orderDate = "2023-06-15",
  status = "pending_seller_confirmation",
  userRole = "buyer",
  productName = "Product Name",
  price = 99.99,
  sellerName = "Seller Name",
  buyerName = "Buyer Name",
  deliveryPersonName,
  estimatedDeliveryDate = "2023-06-20",
  onConfirmOrder = () => {},
  onRejectOrder = () => {},
  onAcceptDeliveryJob = () => {},
  onUpdateDeliveryStatus = () => {},
  onConfirmDelivery = () => {},
  onReportIssue = () => {},
}) => {
  const getStatusBadge = () => {
    const statusMap: Record<
      OrderStatus,
      {
        label: string;
        variant: "default" | "secondary" | "destructive" | "outline";
      }
    > = {
      pending_seller_confirmation: {
        label: "Pending Seller Confirmation",
        variant: "outline",
      },
      confirmed: { label: "Confirmed", variant: "secondary" },
      rejected: { label: "Rejected", variant: "destructive" },
      delivery_job_available: {
        label: "Delivery Job Available",
        variant: "outline",
      },
      delivery_assigned: { label: "Delivery Assigned", variant: "secondary" },
      in_progress: { label: "In Progress", variant: "secondary" },
      package_picked_up: { label: "Package Picked Up", variant: "secondary" },
      package_in_transit: { label: "In Transit", variant: "secondary" },
      package_arrived: { label: "Package Arrived", variant: "secondary" },
      awaiting_buyer_confirmation: {
        label: "Awaiting Buyer Confirmation",
        variant: "outline",
      },
      delivery_confirmed: { label: "Delivery Confirmed", variant: "default" },
      dispute: { label: "Dispute", variant: "destructive" },
      completed: { label: "Completed", variant: "default" },
    };

    const statusInfo = statusMap[status];
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const renderActionButtons = () => {
    if (userRole === "seller" && status === "pending_seller_confirmation") {
      return (
        <div className="flex space-x-2">
          <Button onClick={onConfirmOrder} className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" /> Confirm Order
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center">
                <XCircle className="mr-2 h-4 w-4" /> Reject Order
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Rejecting this order will cancel the transaction and refund
                  the buyer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onRejectOrder}>
                  Reject Order
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    }

    if (userRole === "delivery" && status === "delivery_job_available") {
      return (
        <Button onClick={onAcceptDeliveryJob} className="flex items-center">
          <Truck className="mr-2 h-4 w-4" /> Accept Delivery Job
        </Button>
      );
    }

    if (
      userRole === "delivery" &&
      ["delivery_assigned", "in_progress"].includes(status)
    ) {
      return (
        <Button
          onClick={() => onUpdateDeliveryStatus("package_picked_up")}
          className="flex items-center"
        >
          <Package className="mr-2 h-4 w-4" /> Mark as Picked Up
        </Button>
      );
    }

    if (userRole === "delivery" && status === "package_picked_up") {
      return (
        <Button
          onClick={() => onUpdateDeliveryStatus("package_in_transit")}
          className="flex items-center"
        >
          <Truck className="mr-2 h-4 w-4" /> Mark as In Transit
        </Button>
      );
    }

    if (userRole === "delivery" && status === "package_in_transit") {
      return (
        <Button
          onClick={() => onUpdateDeliveryStatus("package_arrived")}
          className="flex items-center"
        >
          <CheckCircle className="mr-2 h-4 w-4" /> Mark as Arrived
        </Button>
      );
    }

    if (userRole === "delivery" && status === "package_arrived") {
      return (
        <Button
          onClick={() => onUpdateDeliveryStatus("awaiting_buyer_confirmation")}
          className="flex items-center"
        >
          <CheckCircle className="mr-2 h-4 w-4" /> Mark as Delivered
        </Button>
      );
    }

    if (userRole === "buyer" && status === "awaiting_buyer_confirmation") {
      return (
        <div className="flex space-x-2">
          <Button onClick={onConfirmDelivery} className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" /> Confirm Delivery
          </Button>
          <Button
            variant="outline"
            onClick={onReportIssue}
            className="flex items-center"
          >
            <XCircle className="mr-2 h-4 w-4" /> Report Issue
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{productName}</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-muted-foreground">Order ID:</div>
          <div className="font-medium">{orderId}</div>

          <div className="text-muted-foreground">Order Date:</div>
          <div className="font-medium">{orderDate}</div>

          <div className="text-muted-foreground">Price:</div>
          <div className="font-medium flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            {price.toFixed(2)}
          </div>

          {userRole !== "seller" && (
            <>
              <div className="text-muted-foreground">Seller:</div>
              <div className="font-medium">{sellerName}</div>
            </>
          )}

          {userRole !== "buyer" && (
            <>
              <div className="text-muted-foreground">Buyer:</div>
              <div className="font-medium">{buyerName}</div>
            </>
          )}

          {deliveryPersonName && (
            <>
              <div className="text-muted-foreground">Delivery Person:</div>
              <div className="font-medium">{deliveryPersonName}</div>
            </>
          )}

          {estimatedDeliveryDate && status !== "rejected" && (
            <>
              <div className="text-muted-foreground">Est. Delivery:</div>
              <div className="font-medium flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {estimatedDeliveryDate}
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">{renderActionButtons()}</CardFooter>
    </Card>
  );
};

export default OrderStatusCard;
