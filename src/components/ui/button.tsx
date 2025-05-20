type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props : ButtonProps) {
  return (
    <button className='p-3 bg-rose-400/90 w-full text-white rounded mt-4 hover:bg-rose-600 transition-all'
    {...props}
    />
  )
}

export default Button