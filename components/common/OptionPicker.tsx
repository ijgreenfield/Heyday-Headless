/** @jsxRuntime classic */
/** @jsx jsx */
import { FC } from 'react'
import { jsx } from 'theme-ui'
import { Select } from '@theme-ui/components'

export interface OptionPickerProps {
  name: string
  options?: Readonly<Array<string | undefined>>
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  selected?: string
  className?: string
}

const OptionPicker: FC<OptionPickerProps> = ({
  name,
  options,
  onChange,
  selected,
  className
}) => {
  return (
    <div className={className}>
      <select id={name} onChange={onChange} value={selected} className="border border-neutral-primary h-full w-full">
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default OptionPicker
