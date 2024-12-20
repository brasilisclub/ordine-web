import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Product } from "@/types/app";

interface ProductCardProps {
  ordineId?: string;
  product: Product;
  prevQuantity?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAdd?: any;
}

export default function ProductCard({
  ordineId,
  product,
  prevQuantity = 0,
  onAdd,
}: ProductCardProps) {
  console.log(prevQuantity);
  const [quantity, setQuantity] = useState(prevQuantity);
  const productId = `product-${product.id}`;
  const quantityId = `quantity-${product.id}`;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const renderFooter = () => {
    if (!onAdd) {
      return null;
    }

    const handleAddToTab = () => {
      if (quantity > 0) {
        onAdd(
          [{ product_id: Number(product.id), quantity: Number(quantity) }],
          ordineId,
        );
        setQuantity(0);
      }
    };
    return (
      <CardFooter className="flex justify-between items-center">
        <div
          className="flex items-center space-x-2"
          role="group"
          aria-labelledby={quantityId}
        >
          <span id={quantityId} className="sr-only">
            Quantity controls
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            disabled={quantity === 0}
            aria-label="Decrease quantity"
          >
            <MinusCircle className="h-4 w-4" aria-hidden="true" />
          </Button>
          <span
            className="w-8 text-center"
            aria-live="polite"
            aria-label={`Quantity: ${quantity}`}
          >
            {quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <Button
          onClick={handleAddToTab}
          disabled={quantity === 0}
          aria-label={`Add ${quantity} ${product.name} to tab`}
        >
          Adicionar
        </Button>
      </CardFooter>
    );
  };

  return (
    <article aria-labelledby={productId}>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-lg">
                <h3 id={productId}>{product.name}</h3>
              </CardTitle>
            </div>
            <span
              aria-label={`Price: $${product.price.toFixed(2)}`}
              className="text-lg font-bold"
            >
              R${product.price.toFixed(2)}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </CardContent>
        {renderFooter()}
      </Card>
    </article>
  );
}
