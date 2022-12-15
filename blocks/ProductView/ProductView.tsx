/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo, useState, useEffect } from 'react'
import { Themed, jsx } from 'theme-ui'
import { Grid, Button, Container } from '@theme-ui/components'
import OptionPicker from '@components/common/OptionPicker'
import { NextSeo } from 'next-seo'
import { useUI } from '@components/ui/context'
import { useAddItemToCart } from '@lib/shopify/storefront-data-hooks'
import {
  prepareVariantsWithOptions,
  prepareVariantsImages,
  getPrice,
} from '@lib/shopify/storefront-data-hooks/src/utils/product'
import { ImageCarousel, LoadingDots } from '@components/ui'
import ProductLoader from './ProductLoader'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

interface Props {
  className?: string
  children?: any
  product: ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  title?: string
}

const ProductBox: React.FC<Props> = ({
  product,
  renderSeo,
  description = product.description,
  title = product.title,
}) => {
  const [loading, setLoading] = useState(false)
  const addItem = useAddItemToCart()
  const colors: string[] | undefined = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'color')
    ?.values?.map((op) => op.value as string)

  const sizes: string[] | undefined = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'size')
    ?.values?.map((op) => op.value as string)

  const variants = useMemo(
    () => prepareVariantsWithOptions(product?.variants),
    [product?.variants]
  )
  const images = useMemo(() => prepareVariantsImages(variants, 'color'), [
    variants,
  ])

  const { openSidebar } = useUI()

  const [variant, setVariant] = useState(variants[0] || {})
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)

  useEffect(() => {
    const newVariant = variants.find((variant) => {
      return (
        (variant.size === size || !size) && (variant.color === color || !color)
      )
    })

    if (variant.id !== newVariant?.id) {
      setVariant(newVariant)
    }
  }, [size, color, variants, variant.id])

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem(variant.id, 1)
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const allImages = images
    .map(({ src }) => ({ src: src.src }))
    .concat(
      product.images &&
        product.images.filter(
          ({ src }) => !images.find((image) => image.src.src === src)
        )
    )

  const ingredients = [
    {
      title: "Blah",
      answer: "A stable form of vitamin C, a powerful antioxidant with brightening capabilities."
    },
    {
      title: "Blah",
      answer: "A stable form of vitamin C, a powerful antioxidant with brightening capabilities."
    },
    {
      title: "Blah",
      answer: "A stable form of vitamin C, a powerful antioxidant with brightening capabilities."
    },
    {
      title: "Blah",
      answer: "A stable form of vitamin C, a powerful antioxidant with brightening capabilities."
    },
  ]

  return (
    <React.Fragment>
      {renderSeo && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title: title,
            description: description,
            images: [
              {
                url: product.images?.[0]?.src!,
                width: 800,
                height: 600,
                alt: title,
              },
            ],
          }}
        />
      )}
      <div className='px-12 mb-12'>
        <div className='grid grid-cols-2 gap-24'>
          <div className=''>
            <div>
              <ImageCarousel
                showZoom
                alt={title}
                width={1050}
                height={1050}
                priority
                onThumbnailClick={(index) => {
                  if (images[index]?.color) {
                    setColor(images[index].color)
                  }
                }}
                images={allImages?.length > 0 ? allImages: [{
                    src: `https://via.placeholder.com/1050x1050`,
                  }]}
              ></ImageCarousel>
            </div>
          </div>
          <div sx={{ display: 'flex', flexDirection: 'column' }}>
            <span sx={{ mt: 0, mb: 2 }}>
              <Themed.h1>{title}</Themed.h1>
              <Themed.h4 aria-label="price" sx={{ mt: 0, mb: 2 }}>
                {getPrice(variant.priceV2.amount, variant.priceV2.currencyCode)}
              </Themed.h4>
            </span>
            <div dangerouslySetInnerHTML={{ __html: description! }} />
            <div>
              <Grid columns={2}>
                {colors?.length && (
                  <OptionPicker
                    key="Color"
                    name="Color"
                    options={colors}
                    selected={color}
                    onChange={(event) => setColor(event.target.value)}
                  />
                )}
                {sizes?.length && (
                  <OptionPicker
                    key="Size"
                    name="Size"
                    options={sizes}
                    selected={size}
                    onChange={(event) => setSize(event.target.value)}
                  />
                )}
              </Grid>
            </div>
            <div className='mb-4'>
              <Button
                name="add-to-cart"
                disabled={loading}
                onClick={addToCart}
              >
                Add to Cart {loading && <LoadingDots />}
              </Button>
            </div>

            <div>
              {ingredients.map(ingredient => (
                <div key={ingredient.title}>
                  <Disclosure>
                  {({ open }) => (
                    <>
                    <Disclosure.Button className="flex w-full justify-between border-b border-b-blackpx-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                      <span>{ingredient.title}</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500">
                      {ingredient.answer}
                    </Disclosure.Panel>
                    </>
                  )}
                  </Disclosure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* From the Treatment Room */}
      <div className="bg-ocean-100 py-20">
        <div className='text-center text-white flex flex-col gap-4 max-w-2xl mx-auto '>
          <span>• FROM THE TREATMENT ROOM •</span>
          <p className='text-2xl font-medium'>Apply with toner, or mix with your favorite facial oil for the complete balance of brightening and hydration. This anti-aging serum is also safe to use around the eyes.</p>
        </div>
      </div>
      {/* From the Treatment Room End */}
    </React.Fragment>
  )
}

const ProductView: React.FC<{
  product: string | ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  title?: string
}> = ({ product, ...props }) => {
  return (
    <ProductLoader product={product}>
      {(productObject) => <ProductBox {...props} product={productObject} />}
    </ProductLoader>
  )
}
export default ProductView
