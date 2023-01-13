/** @jsxRuntime classic */
/** @jsx jsx */
import { FC } from 'react'
import { useUI } from '@components/ui/context'
import { jsx } from 'theme-ui'
import { ShoppingBagIcon, UserIcon, MagnifyingGlassIcon} from '@heroicons/react/24/outline'
import Searchbar from './Searchbar'

interface Props {
  className?: string
}

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const { toggleSidebar } = useUI()

  return (
    <div className='flex items-center gap-4' aria-label="Cart">
      <Searchbar />
      <ShoppingBagIcon className='h-6 w-6' onClick={toggleSidebar} />
      <UserIcon className='h-6 w-6' />
    </div>
  )
}

export default UserNav
