/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect } from 'react'
import { NextSeo } from 'next-seo'
import { Themed, jsx } from 'theme-ui'
import { LoadingDots } from '@components/ui'
import shopifyConfig from '@config/shopify'
import { ProductGrid, ProductGridProps } from '../ProductGrid/ProductGrid'
import { getCollection } from '@lib/shopify/storefront-data-hooks/src/api/operations'
import { Container } from '@components/common'

interface Props {
  className?: string
  children?: any
  collection: string | any // ShopifyBuy.Collection once their types are up to date
  productGridOptions: ProductGridProps
  renderSeo?: boolean
}

const CollectionPreview: FC<Props> = ({
  collection: initialCollection,
  productGridOptions,
  renderSeo,
}) => {
  const [collection, setCollection] = useState(initialCollection)
  const [loading, setLoading] = useState(false)

  useEffect(() => setCollection(initialCollection), [initialCollection])

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true)
      const result = await getCollection(shopifyConfig, {
        handle: collection,
      })
      setCollection(result)
      setLoading(false)
    }
    if (typeof collection === 'string') {
      fetchCollection()
    }
  }, [collection])

  if (!collection || typeof collection === 'string' || loading) {
    return <LoadingDots />
  }

  const { title, description, products } = collection

  return (
    <div className='flex flex-col py-8' key={collection.id}>
      {renderSeo && (
        <NextSeo
          title={collection.title}
          description={collection.description}
          openGraph={{
            type: 'website',
            title,
            description,
          }}
        />
      )}
      <Container>
        <div className='flex flex-col block mb-8'>
          <span className='mt-0 mb-2'>
            <h1 className="text-4xl">{collection.title}</h1>
          </span>
          <div dangerouslySetInnerHTML={{ __html: collection.description! }} />
        </div>
        <div>
          <ProductGrid {...productGridOptions} products={products} />
        </div>
      </Container>
    </div>
  )
}

export default CollectionPreview
