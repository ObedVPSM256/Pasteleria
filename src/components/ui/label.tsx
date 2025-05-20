type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function Label(props : LabelProps) {
  return (
    <label className='text-rose-700 mb-2 block text-sm my-3'
        {...props}
    />
    
  )
}

export default Label
