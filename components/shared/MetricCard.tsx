import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { memo } from "react";

export interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export const MetricCard = memo(function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "default",
  className,
}: MetricCardProps) {
  const getValueColor = () => {
    switch (variant) {
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-secondary";
      default:
        return "";
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="text-muted-foreground h-4 w-4" />}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${getValueColor()}`}>{value}</div>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </CardContent>
    </Card>
  );
});
