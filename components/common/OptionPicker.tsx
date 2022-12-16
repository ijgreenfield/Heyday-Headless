/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Select, Label } from '@theme-ui/components'
export interface OptionPickerProps {
  name: string
  options?: Readonly<Array<string | undefined>>
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  selected?: string
}

const OptionPicker: React.FC<OptionPickerProps> = ({
  name,
  options,
  onChange,
  selected,
}) => {
  return (
    <div className='w-full'>
      {/*<Label htmlFor={name}>{name}</Label>
      <Select id={name} onChange={onChange} value={selected}>
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
        </Select>*/}

        <div className='flex gap-3'>
          {options?.map(option => (
            <div key={option} className='border p-3 rounded-lg'>
              {option}
            </div>
          ))}
        </div>
    </div>
  )
}

export default OptionPicker
