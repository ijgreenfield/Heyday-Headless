/** @jsxRuntime classic */
/** @jsx jsx */
import { FC } from 'react'
import { Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Button, jsx } from 'theme-ui'
import Customer from '@components/icons/Customer'
import { ShoppingBagIcon, UserIcon} from '@heroicons/react/24/outline'

interface Props {
  className?: string
}

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const { toggleSidebar } = useUI()

  return (
    <div className='flex items-center gap-2' onClick={toggleSidebar} aria-label="Cart">
      <UserIcon className='h-6 w-6' />
      <ShoppingBagIcon className='h-6 w-6' />
    </div>
  )
}

export default UserNav
