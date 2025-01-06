import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
}

export const StatCard = ({ title, value, icon, description, className = "" }: StatCardProps) => {
  return (
    <Card className={`p-6 hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-2 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            {value}
          </h3>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-full text-primary">
          {icon}
        </div>
      </div>
    </Card>
  );
};