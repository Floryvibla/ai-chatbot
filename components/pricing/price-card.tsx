import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Check } from "lucide-react";
import { Card } from "../ui/card";

interface PriceCardProps {
  title: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  currency?: string;
  disabled?: boolean;
}

export function PriceCard({
  title,
  description,
  price,
  period,
  features,
  popular = false,
  buttonText = "Começar",
  onButtonClick,
  currency = "R$",
  disabled = false,
}: PriceCardProps) {
  return (
    <Card
      className={clsx(`flex flex-col p-6 rounded-lg`, {
        "border-2 border-primary": popular,
      })}
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>

      <div className="flex items-baseline mb-6">
        <span className="text-3xl font-bold">{currency}</span>
        <span className="text-4xl font-bold">{price}</span>
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
          /{period}
        </span>
      </div>

      <Button
        onClick={onButtonClick}
        disabled={disabled}
        className={clsx("w-full mb-6", {
          "border-primary": !popular,
        })}
        variant={popular ? "default" : "outline"}
      >
        {buttonText}
      </Button>

      {features.map((feature, index) => (
        <div key={index} className="flex items-start mb-2">
          <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
          <span className="text-sm ">{feature}</span>
        </div>
      ))}
    </Card>
  );
}
