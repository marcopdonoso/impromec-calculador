import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
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
  }, [query])

  // Función para buscar ciudades en la API de Geonames
  const fetchCities = async (searchTerm: string): Promise<City[]> => {
    try {
      // Sustituye 'YOUR_USERNAME' con tu nombre de usuario de Geonames
      const response = await fetch(
        `https://secure.geonames.org/searchJSON?name_startsWith=${encodeURIComponent(searchTerm)}&countryBias=BO&maxRows=10&username=marcopdonoso&featureClass=P&style=FULL`
      )
      const data = await response.json()

      if (data.geonames && Array.isArray(data.geonames)) {
        return data.geonames.map((city: any) => ({
          name: city.name,
          country: city.countryName,
          adminName1: city.adminName1,
          geonameId: city.geonameId,
        }))
      }
      return []
    } catch (error) {
      console.error('Error fetching cities:', error)
      return []
    }
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
          <label className="mb-2 block text-sm font-medium">{label}</label>
          <Combobox
            value={field.value}
            onChange={(city) => {
              field.onChange(city ? formatCity(city) : '')
            }}
          >
            <div className="relative">
              <div
                className={`bg-white relative w-full cursor-default overflow-hidden rounded-lg border text-left ${error ? 'border-red' : 'border-gray-300'} focus-within:border-primary`}
              >
                <Combobox.Input
                  className="text-gray-900 w-full border-none py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none"
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
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="text-gray-400 h-5 w-5"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options className="bg-white ring-black absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
                  {isLoading && (
                    <div className="text-gray-700 relative cursor-default select-none px-4 py-2">
                      Buscando ciudades...
                    </div>
                  )}

                  {!isLoading && cities.length === 0 && query.length >= 3 && (
                    <div className="text-gray-700 relative cursor-default select-none px-4 py-2">
                      No se encontraron ciudades.
                    </div>
                  )}

                  {cities.map((city) => (
                    <Combobox.Option
                      key={city.geonameId}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-primary text-white' : 'text-gray-900'
                        }`
                      }
                      value={city}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {formatCity(city)}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-primary'
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          {error && <p className="mt-1 text-sm text-red">{error}</p>}
        </div>
      )}
    />
  )
}
