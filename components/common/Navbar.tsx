/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, NavSidebar, UserNav } from '@components/common'
import { BuilderComponent, builder } from '@builder.io/react'
import { useCart } from '@lib/shopify/storefront-data-hooks'
import { jsx, Themed, useThemeUI } from 'theme-ui'
import { useUI } from '@components/ui/context'
import Image from 'next/image'
import Searchbar from './Searchbar'
import { Bars2Icon } from '@heroicons/react/24/outline'

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

  const { displaySidebar, closeSidebar, toggleSidebar } = useUI()
  return (
    <>
      <BuilderComponent
        content={announcement}
        data={{ theme }}
        model="announcement-bar"
      />
      <header className='my-0 mx-auto relative bg-white border-b border-neutral-primary'>
        <Container>
          <div className='flex justify-between items-center bg-white py-4 md:py-6 relative'>
            <div className='absolute left-2/4 transform -translate-x-2/4'>
              <div className='flex items-center'>
                {logo && logo.image && (
                  <Link href="/">
                    <Image
                      layout="fixed"
                      width={logo.width}
                      height={logo.height}
                      src={logo.image}
                    ></Image>
                  </Link>
                )}
              </div>
            </div>

            <div className='hidden md:flex gap-x-12 justify-start font-mono text-sm'>
            {navigationLinks?.map((link, index) => (
              <div key={index} className=''>
                <Link href={link.link}>
                  {link.title}
                </Link>
              </div>
            ))}
          </div>

            <div className='md:hidden'>
              <div className='flex '>
                <Bars2Icon className='h-6 w-6' onClick={toggleSidebar}/>
                <NavSidebar
                  open={displaySidebar}
                  onClose={closeSidebar}
                >
                  <p>hi</p>
                </NavSidebar>
              </div>
            </div>
            <div className=''>
              <div>
                <UserNav />
              </div>
            </div>
          </div>
        </Container>
      </header>
    </>
  )
}

export default Navbar
