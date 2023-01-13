/** @jsxRuntime classic */
/** @jsx jsx */
import { Themed, jsx } from 'theme-ui'
import Button from '@components/ui/Button'
import { Card, Text } from '@theme-ui/components'
import { Link, ImageCarousel } from '@components/ui'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'
import { useAddItemToCart } from '@lib/shopify/storefront-data-hooks'
import { useUI } from '@components/ui/context'
import { useEffect, useState } from 'react'

export interface ProductCardProps {
  className?: string
  product: ShopifyBuy.Product
  imgWidth: number | string
  imgHeight: number | string
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const [loading, setLoading] = useState(false)
  const addItem = useAddItemToCart()
  const handle = (product as any).handle
  const productVariant: any = product.variants[0]
  const price = getPrice(
    productVariant.priceV2.amount,
    productVariant.priceV2.currencyCode
  )

const { openSidebar } = useUI()


  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem(productVariant.id, 1)
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <Card className="flex flex-col">
      <Link href={`/product/${handle}/`}>
        <div sx={{ flexGrow: 1 }}>
          <ImageCarousel
            currentSlide={product.images ? product.images.length - 1 : 0}
            width={imgWidth}
            height={imgHeight}
            priority={imgPriority}
            loading={imgLoading}
            layout={imgLayout}
            sizes={imgSizes}
            alt={product.title}
            images={
              product.images.length ? product.images : [{
                src: `https://via.placeholder.com/${imgWidth}x${imgHeight}`,
              }]
            }
          />
        </div>
        <div className='flex flex-col py-3'>
          <span className='uppercase text-xs'>{product.vendor}</span>
          <span className='text-sm font-sans'>
            {product.title}
          </span>
          <Button onClick={addToCart} className="border border-neutral-primary text-xs py-2">
            Add to Cart - {price}
          </Button>
        </div>
      </Link>
    </Card>
  )
}

export default ProductCard
