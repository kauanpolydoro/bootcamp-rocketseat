import { memo } from "react"

interface ProductItemsProps {
  product: {
    id: number,
    price: number,
    title: string;
  }
}

function ProductItemComponent({ product }: ProductItemsProps) {

  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)
});