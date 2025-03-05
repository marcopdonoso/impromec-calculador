import { getGeonames } from '@/services/geonames.service'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from '@headlessui/react'
import { ChevronUpDownIcon, XCircleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

// Define el tipo de ciudad
interface City {
  name: string
  country: string
  adminName1?: string
  geonameId: string
}

interface LocationAutocompleteProps {
  name: string
  control: Control<any>
  label: string
  placeholder?: string
  error?: string
}

export default function LocationAutocomplete({
  name,
  control,
  label,
  placeholder = 'Buscar ciudad...',
  error,
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [cities, setCities] = useState<City[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Efecto para buscar ciudades con un debounce
  useEffect(() => {
    if (query.length < 3) {
      setCities([])
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(true)
      fetchCities(query)
        .then((data) => {
          setCities(data)
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
    }, 300) // Debounce de 300ms

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // Función para buscar ciudades en la API de Geonames
  const fetchCities = async (searchTerm: string): Promise<City[]> => {
    const response = await getGeonames(searchTerm)
    const data = response.data

    if (response.error) {
      console.log(response.error)
      return []
    }

    if (data.geonames && Array.isArray(data.geonames)) {
      return data.geonames.map((city: any) => ({
        name: city.name,
        country: city.countryName,
        adminName1: city.adminName1,
        geonameId: city.geonameId,
      }))
    }

    return []
  }

  // Formatea la ciudad para mostrar
  const formatCity = (city: City) => {
    return `${city.name}, ${city.adminName1 ? `${city.adminName1}, ` : ''}${city.country}`
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="w-full">
          <label className="body_small_medium mb-1 block">{label}</label>
          <Combobox
            value={field.value}
            onChange={(city) => {
              field.onChange(city ? formatCity(city) : '')
            }}
          >
            <div className="relative">
              <div
                className={`relative w-full cursor-default overflow-hidden rounded-lg border bg-gray-white text-left ${error ? 'border-red' : 'border-gray-input'} focus-within:border-gray-placeholder`}
              >
                <ComboboxInput
                  autoComplete="off"
                  className="body_small_regular h-12 w-full border-none py-2 pl-5 pr-10 leading-5 text-gray-text focus:outline-none"
                  placeholder={placeholder}
                  displayValue={(city: City) =>
                    typeof city === 'string' ? city : formatCity(city)
                  }
                  onChange={(event) => {
                    setQuery(event.target.value)
                    field.onChange(event.target.value)
                  }}
                  onBlur={field.onBlur}
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-text"
                    aria-hidden="true"
                  />
                </ComboboxButton>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                // afterLeave={() => setQuery('')}
              >
                <ComboboxOptions
                  className={clsx(
                    'no-scrollbar body_small_regular absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-gray-white py-1 shadow-lg ring-1 ring-gray-dark ring-opacity-5 focus:outline-none',
                    {
                      hidden:
                        !isLoading && cities.length === 0 && query.length < 3,
                    }
                  )}
                >
                  {isLoading && (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-text_inactive">
                      Buscando ciudades...
                    </div>
                  )}

                  {!isLoading && cities.length === 0 && query.length >= 3 && (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-text_inactive">
                      No se encontraron ciudades.
                    </div>
                  )}

                  {cities.map((city) => (
                    <ComboboxOption
                      key={city.geonameId}
                      value={city}
                      className="group flex cursor-default select-none items-center gap-2 px-3 py-1.5 data-[focus]:bg-gray-text/10"
                    >
                      <div className="pl-3 text-sm/6 text-gray-text">
                        {formatCity(city)}
                      </div>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </Transition>
            </div>
          </Combobox>
          {error && (
            <div className="flex items-center gap-3">
              <XCircleIcon className="h-5 w-5 text-red" />
              <p className="body_small_regular text-red lg:body_medium_regular">
                {error}
              </p>
            </div>
          )}
        </div>
      )}
    />
  )
}
