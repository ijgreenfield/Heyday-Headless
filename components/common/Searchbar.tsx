/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import { LoadingDots } from '@components/ui'
import shopifyConfig from '@config/shopify'
import { ProductGrid } from 'blocks/ProductGrid/ProductGrid'
import { Themed, jsx, Input, Label } from 'theme-ui'
import { searchProducts } from '@lib/shopify/storefront-data-hooks/src/api/operations'
import { ExpandModal } from 'react-spring-modal'
import { throttle } from 'lodash'
import 'react-spring-modal/styles.css'
import { Cross } from '@components/icons'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Props {
  className?: string
  id?: string
}

const Searchbar: FC<Props> = () => {
  const router = useRouter()
  const { q } = router.query
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOpen(false)
  }, [router.asPath.split('?')[0]])

  return (
    <React.Fragment>
      <ExpandModal
        transitionConfig={{}}
        contentTransition={{}}
        overlayProps={{
          style: {
            maxWidth: 1920,
            left: '50%',
            transform: 'translateX(-50%)',
            overflow: 'auto',
            top: (buttonRef.current?.getBoundingClientRect().bottom || 0) + 15,
          },
        }}
        isOpen={isOpen}
      >
        <SearchModalContent
          initialSearch={q && String(q)}
          onSearch={(term: string) => {
            const op = q ? 'replace' : 'push'
            router[op]({
              pathname: router.asPath.split('?')[0],
              query: {
                q: term,
              },
            })
          }}
        />
      </ExpandModal>

      <div
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Search"
      >
        {isOpen ? (
          <Cross />
        ) : (
          <MagnifyingGlassIcon className='h-6 w-6'/>
        )}
      </div>
    </React.Fragment>
  )
}

const SearchModalContent = (props: {
  initialSearch?: string
  onSearch: (term: string) => any
}) => {
  const [search, setSearch] = useState(
    props.initialSearch && String(props.initialSearch)
  )
  const [products, setProducts] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const getProducts = async (searchTerm: string) => {
    setLoading(true)
    const results = await searchProducts(
      shopifyConfig,
      String(searchTerm),
    )
    setSearch(searchTerm)
    setProducts(results)
    setLoading(false)
    if (searchTerm) {
      props.onSearch(searchTerm)
    }
  }

  useEffect(() => {
    if (search) {
      getProducts(search)
    }
  }, [])

  const throttleSearch = useCallback(throttle(getProducts), [])

  return (
    <Themed.div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: [1, 2],
        width: '100%',
      }}
    >
      <Input
        type="search"
        sx={{ marginBottom: 15 }}
        defaultValue={props.initialSearch}
        placeholder="Search for products..."
        onChange={(event) => throttleSearch(event.target.value)}
      />
      {loading ? (
        <LoadingDots />
      ) : products.length ? (
        <>
          <Label>
            Search Results for "<strong>{search}</strong>"
          </Label>
          <ProductGrid
            cardProps={{
              imgHeight: 540,
              imgWidth: 540,
              imgPriority: false,
            }}
            products={products}
            offset={0}
            limit={products.length}
          ></ProductGrid>
        </>
      ) : (
        <span>
          {search ? (
            <>
              There are no products that match "<strong>{search}</strong>"
            </>
          ) : (
            <> </>
          )}
        </span>
      )}
    </Themed.div>
  )
}

export default Searchbar
