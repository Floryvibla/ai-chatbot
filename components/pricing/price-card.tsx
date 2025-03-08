import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PriceCardProps {
  title: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  wordLimit?: string;
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
  wordLimit,
}: PriceCardProps) {
  return (
    <div
      className={`flex flex-col p-6 rounded-lg ${
        popular ? "border-2 border-primary bg-slate-800" : "bg-slate-800"
      }`}
    >
      <div className="mb-6">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="mt-2 text-sm text-gray-300">{description}</p>
      </div>

      <div className="flex items-baseline mb-6">
        <span className="text-3xl font-bold">R$</span>
        <span className="text-4xl font-bold">{price}</span>
        <span className="ml-1 text-sm text-gray-300">/{period}</span>
      </div>

      <Button
        onClick={onButtonClick}
        className="w-full mb-6"
        variant={popular ? "default" : "outline"}
      >
        {buttonText}
      </Button>

      {wordLimit && (
        <div className="flex items-start mb-2">
          <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
          <span className="text-sm text-gray-300">{wordLimit}</span>
        </div>
      )}

      {features.map((feature, index) => (
        <div key={index} className="flex items-start mb-2">
          <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
          <span className="text-sm text-gray-300">{feature}</span>
        </div>
      ))}
    </div>
  );
}
