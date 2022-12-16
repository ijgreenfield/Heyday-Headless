/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { UserNav } from '@components/common'
import { BuilderComponent, builder } from '@builder.io/react'
import { useCart } from '@lib/shopify/storefront-data-hooks'
import { jsx, Themed, useThemeUI } from 'theme-ui'
import { useUI } from '@components/ui/context'
import Image from 'next/image'
import Searchbar from './Searchbar'
import { Bars3Icon } from '@heroicons/react/24/outline'

const Navbar: FC = () => {
  const [announcement, setAnnouncement] = useState()
  const { theme } = useThemeUI()
  const { navigationLinks, logo } = useUI()
  const cart = useCart()

  useEffect(() => {
    async function fetchContent() {
      const items = cart?.lineItems || []
      const anouncementContent = await builder
        .get('announcement-bar', {
          cacheSeconds: 120,
          userAttributes: {
            itemInCart: items.map((item: any) => item.variant.product.handle),
          } as any,
        })
        .toPromise()
      setAnnouncement(anouncementContent)
    }
    fetchContent()
  }, [cart?.lineItems])

  return (
    <React.Fragment>
      {/*<BuilderComponent
        content={announcement}
        data={{ theme }}
        model="announcement-bar"
      />*/}
      <header className='my-0 mx-auto relative bg-white'>
        <div className='flex justify-between items-center bg-white z-50 px-3 py-5 fixed top-0 left-0 right-0'>
        <Themed.div
          sx={{
            display: ['none', 'none', 'flex'],
            flexBasis: 0,
            flex: 1,
            minWidth: 240,
            justifyContent: 'start',
          }}
        >
          {navigationLinks?.map((link, index) => (
            <div key={index} className='mr-8'>
              <Link href={link.link}>
                {link.title}
              </Link>
            </div>
          ))}
        </Themed.div>
        <Themed.div
          sx={{
            flex: 1,
            transform: 'translateX(-50%)',
            left: '50%',
            position: 'absolute',
          }}
        >
          <Themed.h1
            sx={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {logo && logo.image && (
              <Themed.a
                as={Link}
                href="/"
                sx={{
                  letterSpacing: -1,
                  textDecoration: `none`,
                  paddingLeft: '5px',
                }}
              >
                <Image
                  layout="fixed"
                  width={logo.width}
                  height={logo.height}
                  src={logo.image}
                ></Image>
              </Themed.a>
            )}
            {logo && logo.text && !logo.image && (
              <Themed.a
                as={Link}
                href="/"
                sx={{
                  letterSpacing: -1,
                  textDecoration: `none`,
                  paddingLeft: '5px',
                }}
              >
                {logo.text}
              </Themed.a>
            )}
          </Themed.h1>
        </Themed.div>
        <Themed.div
          sx={{
            display: 'flex',
            flex: 1,
            minWidth: 140,
            width: '100%',
            justifyContent: ['space-between', 'flex-end'],
          }}
        >
          <div className='flex items-center'>
            <Bars3Icon className='h-6 w-6'/>
          </div>
          <UserNav />
        </Themed.div>
        </div>
      </header>
    </React.Fragment>
  )
}

export default Navbar
