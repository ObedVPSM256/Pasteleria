type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input(props : InputProps) {
  return (
    <input className='p-3 my-3 rounded block mb-2 bg-rose-200/80 text-rose-950 w-full'
    {...props}
    />
  )
}

export default Input
