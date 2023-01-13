/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { Themed, jsx, Text, Card, Grid, Divider, NavLink } from 'theme-ui'
import { FC, useEffect, useState } from 'react'
import { Bag } from '@components/icons'
import { useCart, useCheckoutUrl } from '@lib/shopify/storefront-data-hooks'
import CartItem from '../CartItem'
import { BuilderComponent, builder } from '@builder.io/react'
import env from '@config/env'
import Button from '@components/ui/Button'

const CartSidebarView: FC = () => {
  const checkoutUrl = useCheckoutUrl()
  const cart = useCart()
  const subTotal = cart?.subtotalPrice
  const total = ' - '

  const items = cart?.lineItems ?? []
  const isEmpty = items.length === 0
  const [cartUpsell, setCartUpsell] = useState()

  useEffect(() => {
    async function fetchContent() {
      const items = cart?.lineItems || []
      const cartUpsellContent = await builder
        .get('cart-upsell-sidebar', {
          cacheSeconds: 120,
          userAttributes: {
            itemInCart: items.map((item: any) => item.variant.product.handle),
          } as any,
        })
        .toPromise()
      setCartUpsell(cartUpsellContent)
    }
    fetchContent()
  }, [cart?.lineItems])

  return (
    <div className={`h-full pb-5 px-6 flex flex-col items-center bg-neutral-tertiary ${isEmpty &&  'justify-center' }`}>
      {isEmpty ? (
        <div className='flex flex-col gap-y-4 justify-center items-center w-full'>
          <Bag />
          <p className='text-2xl'>Your cart is empty</p>
          <Button className='border border-neutral-primary w-full py-3 font-semibold' href='/collections/all'>Start Shopping</Button>
        </div>
      ) : (
        <>
          {items.map((item: any) => (
            <CartItem
              key={item.id}
              item={item}
              // todo update types
              currencyCode={item.variant?.priceV2?.currencyCode || 'USD'}
            />
          ))}
          <Card sx={{ marginLeft: 'auto', minWidth: '10rem', paddingLeft: 5 }}>
            <Grid gap={1} columns={2} sx={{ my: 3 }}>
              <Text>Subtotal:</Text>
              <Text sx={{ marginLeft: 'auto' }}>{subTotal}</Text>
              <Text>Shipping:</Text>
              <Text sx={{ marginLeft: 'auto' }}> - </Text>
              <Text>Tax: </Text>
              <Text sx={{ marginLeft: 'auto' }}> - </Text>
            </Grid>

            <Divider />
            <Grid gap={1} columns={2}>
              <Text variant="bold">Estimated Total:</Text>
              <Text variant="bold" sx={{ marginLeft: 'auto' }}>
                {total}
              </Text>
            </Grid>
          </Card>
          <BuilderComponent content={cartUpsell} model="cart-upsell-sidebar" />
          {checkoutUrl && (
            <NavLink
              variant="nav"
              sx={{ width: '100%', m: 2, p: 12, textAlign: 'center' }}
              href={checkoutUrl!}
            >
              Proceed to Checkout
            </NavLink>
          )}
        </>
      )}
    </div>
  )
}

export default CartSidebarView
