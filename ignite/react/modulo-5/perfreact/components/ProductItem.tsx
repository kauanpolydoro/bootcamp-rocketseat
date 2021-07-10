interface ProductItemsProps {
  product: {
    id: number,
    price: number,
    title: string;
  }
}

export function ProductItem({ product }: ProductItemsProps) {

  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  )
}