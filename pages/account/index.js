import { Layout } from '@components/common'
import Image from 'next/image'
import Link from 'next/link'

export default function AccountHome() {
  return (
    <div className='bg-gray-100'>
      <div className='px-3 py-6'>
        <div className='flex justify-between mb-6'>
          <div>
            <h1 className=''>Ian Greenfield</h1>
            <p>Client since <span>2022</span></p>
          </div>
          <div className=''>
            <Image
              src='https://res.cloudinary.com/dinn28die/image/upload/v1671132333/cld-sample.jpg'
              alt='Sample Avatar Image'
              width={100}
              height={100}
              className='rounded-full'
            />
          </div>
        </div>

        <div className='mb-8'>
          <div className='flex justify-between items-center mb-3'>
            <p className='text-2xl'>Your Appointments</p>
            <Link href='/account/'>
              <div>
                <span>View All</span>
              </div>
            </Link>
          </div>
          <div>
            <figure className='bg-white rounded-lg overflow-hidden'>
              <div className='w-full h-36 relative'>
                <Image
                  src='https://res.cloudinary.com/dinn28die/image/upload/v1671132333/cld-sample-2.jpg'
                  alt='Placeholder'
                  layout='fill'
                />
              </div>
              <div className='px-4 pb-3 pt-6 w-3/4'>
                <span className='uppercase'>Dec 30 @ Rittenhouse</span>
                <h3>50 Minute Facial with Leighanne S.</h3>
              </div>
            </figure>
          </div>
        </div>

        <div className='mb-8'>
          <div className='flex justify-between items-center mb-3'>
            <p className='text-2xl'>Recent Orders</p>
            <Link href='/account/'>
              <div>
                <span>View All</span>
              </div>
            </Link>
          </div>
          <div>
            <figure className='bg-white rounded-lg overflow-hidden'>
              <div className='px-4 py-4 flex flex-col gap-3'>
                <div>
                  <h2>Sun, Dec 18</h2>
                  <div>
                    <span className=''>Order No. 79496 $39.00</span>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <Image
                    src='https://res.cloudinary.com/dinn28die/image/upload/v1671132334/cld-sample-5.jpg'
                    alt='Placeholder'
                    width={60}
                    height={60}
                    className='rounded-lg'
                  />
                  <Image
                    src='https://res.cloudinary.com/dinn28die/image/upload/v1671132334/cld-sample-5.jpg'
                    alt='Placeholder'
                    width={60}
                    height={60}
                    className='rounded-lg'
                  />
                  <Image
                    src='https://res.cloudinary.com/dinn28die/image/upload/v1671132334/cld-sample-5.jpg'
                    alt='Placeholder'
                    width={60}
                    height={60}
                    className='rounded-lg'
                  />
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
}

AccountHome.Layout = Layout
