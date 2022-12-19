/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import { Themed, jsx } from 'theme-ui'
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
import { getReviews } from '@lib/yotpo'

interface Props {
  className?: string
  children?: any
  product: ShopifyBuy.Product
  renderSeo?: boolean
  vendor?: string
  description?: string
  title?: string
}


const ProductBox: React.FC<Props> = ({
  product,
  renderSeo,
  vendor = product.vendor,
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
      title: "Magnesium Phosphate",
      answer: "A stable form of vitamin C, a powerful antioxidant with brightening capabilities."
    },
    {
      title: "Sodium Hyaluronate",
      answer: "A humectant with excellent hydrating properties that revitalize skin texture."
    },
    {
      title: "Palmitoyl Pentapeptide",
      answer: "A peptide that stimulates collagen synthesis while protecting against collagen degradation for firmer, more supple skin."
    },
    {
      title: "Full Ingredient List",
      answer: "Aqua/Water/Eau, Glycerin, Aloe Barbadensis Leaf Juice, Citrus Aurantium Dulcis (Orange) Oil, Caprylic/Capric Triglyceride, Limonene, C12-15 Alkyl Benzoate, Cetearyl Olivate, Sorbitan Olivate, Imperata Cylindrica Root Extract, Magnesium Ascorbyl Phosphate, Ppg-12/Smdi Copolymer, Tetrahexyldecyl Ascorbate, Glyceryl Stearate, Peg-100 Stearate, Cetyl Alcohol, Dimethicone, Di-Ppg-2 Myreth-10 Adipate, Stearic Acid, Phenoxyethanol, Ethylhexyl Methoxycinnamate, Panthenol, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Xanthan Gum, Caprylyl Glycol, Butylene Glycol, Tocopheryl Acetate, Glycine Soja (Soybean) Sterols, Linoleic Acid, Phospholipids, Simmondsia Chinensis (Jojoba) Seed Oil, Squalane, Propylene Glycol, Ethylhexylglycerin, Glucosamine Hcl,"
    },
  ]

  //async function getAllReviews() {
   // const ID = (product.id as string).split('/Product/')[1]
    //const reviews = await getReviews(ID)

   // return(reviews)
  //}

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
      <div className='md:px-12 mb-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
          <div className='flex flex-col px-3'>
            <span className='mt-0 mb-2'>
              <span className='uppercase text-sm font-sans'>{vendor}</span>
              <h1 className='text-2xl font-normal leading-normal font-sans'>{title}</h1>
              <h4 aria-label="price" className='mt-1 mb-1 text-xl font-semibold font-sans'>
                {getPrice(variant.priceV2.amount, variant.priceV2.currencyCode)}
              </h4>
            </span>
            <div className='mb-3'>
              <div>
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
              </div>
            </div>
            <div className='mb-4 w-full'>
              <button
                name="add-to-cart"
                disabled={loading}
                onClick={addToCart}
                className='py-3 px-3 bg-ocean-100 text-white rounded-lg font-semibold w-full font-sans'
              >
                Add to Cart {loading && <LoadingDots />}
              </button>
            </div>

            <div>
              <div className='mb-3 text-sm font-sans'>
                <div dangerouslySetInnerHTML={{ __html: description! }} />
              </div>
              <div>
                {ingredients.map(ingredient => (
                  <div key={ingredient.title} className='font-sans'>
                    <Disclosure>
                    {({ open }) => (
                      <>
                      <Disclosure.Button className="flex w-full justify-between border-b border-b-blackpx-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                        <span>{ingredient.title}</span>
                        <ChevronUpIcon
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-black`}
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
      </div>

      {/* How We Use It */}
      <div className='bg-shell-50 font-sans'>
        <div className='px-3 py-6'>
          <div className=''>
            <span className='text-sm font-semibold font-sans'>How We Use It</span>
            <h1 className='text-xl'>Morning and Night</h1>
            <p className='text-sm'>Apply a few drops to clean, toned skin, focusing on areas that you feel need a bit of extra attention.</p>
          </div>
          <hr className='my-3'/>
          <div>
            <span className='text-sm font-semibold'>Complete Your Routine</span>
            <div className='mb-3'>
              <span className='uppercase text-sm mb-2'>Before</span>
              <div className='flex bg-white rounded-lg overflow-hidden'>
                <div className='relative h-20 w-20'>
                  <Image
                    src='https://res.cloudinary.com/dinn28die/image/upload/v1671132334/cld-sample-5.jpg'
                    alt='product image'
                    layout='fill'
                  />
                </div>
                <div className='flex flex-col justify-center px-3'>
                  <p className='text-xs uppercase'>Image Skincare</p>
                  <p className='text-sm font-semibold'>Vital C Hydrating Facial Cleanser</p>
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <span className='uppercase text-sm mb-2'>After</span>
              <div className='flex bg-white rounded-lg overflow-hidden'>
                <div className='relative h-20 w-20'>
                  <Image
                    src='https://res.cloudinary.com/dinn28die/image/upload/v1671132334/cld-sample-5.jpg'
                    alt='product image'
                    layout='fill'
                  />
                </div>
                <div className='flex flex-col justify-center px-3'>
                  <p className='text-xs uppercase'>Image Skincare</p>
                  <p className='text-sm font-semibold'>Vital C Hydrating Facial Cleanser</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* How We Use It */}

      {/* From the Treatment Room */}
      <div className="bg-ocean-100 py-16 px-3 font-sans">
        <div className='text-center text-white flex flex-col gap-4 max-w-2xl mx-auto '>
          <span>• FROM THE TREATMENT ROOM •</span>
          <p className='text-lg font-medium'>Apply with toner, or mix with your favorite facial oil for the complete balance of brightening and hydration. This anti-aging serum is also safe to use around the eyes.</p>
        </div>
      </div>
      {/* From the Treatment Room End */}

      {/* Reviews */}
      <div>
        <p></p>
      </div>
      {/* Reviews */}
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
