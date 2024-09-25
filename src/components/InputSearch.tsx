'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Input from './Input'

interface InputSearchProps {
  label?: string
  placeholder?: string
  className?: string
}

export default function InputSearch({
  label,
  placeholder,
  className,
}: InputSearchProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Input
      label={label}
      className={clsx(className, 'lg:w-full')}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder={placeholder}
      defaultValue={searchParams.get('query')?.toString()}
    >
      <MagnifyingGlassIcon className="absolute bottom-4 right-4 w-4 text-gray-placeholder lg:bottom-3 lg:right-3 lg:w-5" />
    </Input>
  )
}
