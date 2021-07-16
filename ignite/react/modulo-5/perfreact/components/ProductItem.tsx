/* eslint-disable react/display-name */
import { memo, useState } from "react"
import dynamic from 'next/dynamic';
import { AddProductToWishlistProps } from "./AddProductToWishlist";
import lodash from 'lodash';

// import { AddProductToWishlist } from "./AddProductToWishlist";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(module => module.AddProductToWishlist)
})

interface ProductItemsProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemsProps) {

  const [isAddingToWishlist, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>

      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}

    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
});