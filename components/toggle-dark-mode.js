import { useTheme } from 'next-themes'
import nightwind from 'nightwind/helper'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'

export default function Toggle ( props ) {
  const { theme, setTheme } = useTheme()

  const toggle = () => {
    nightwind.beforeTransition()
    if ( theme !== "dark" ) {
      setTheme( "dark" )
    } else {
      setTheme( "light" )
    }
  }
  
  return <SunIcon className="h-6 w-6" onClick={toggle} aria-hidden="true" />
}