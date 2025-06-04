'use client'
import MySwitch from '@/components/MySwitch'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

interface SectorSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
  control: Control<TFieldValues>
}

export default function SectorSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control }: SectorSwitchProps<TFieldValues, TName>) {
  return (
    <div className="mt-6 flex w-full flex-col items-center justify-center gap-4 rounded-2xl bg-gray-background px-7 py-6 lg:mt-10 lg:flex-row lg:items-start lg:justify-between lg:pl-14 lg:pr-20">
      <div className="max-w-lg lg:flex-1">
        <p className="body_small_medium lg:body_medium_medium">
          ¿Deseas dividir el proyecto en sectores?
        </p>
        <p className="hidden lg:body_medium_regular lg:mt-2 lg:block">
          Al dividir el proyecto en sectores, es posible optimizar el diseño y
          la selección de bandejas portacables para cada área específica.
        </p>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MySwitch
            initialValue={field.value}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
    </div>
  )
}
