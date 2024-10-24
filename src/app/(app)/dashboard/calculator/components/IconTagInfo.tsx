import { ReactNode } from 'react'

interface IconTagInfoProps {
  icon: ReactNode
  tag: string
  info: string
}
export default function IconTagInfo({ icon, tag, info }: IconTagInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-6">{icon}</div>
      <p className="body_small_medium lg:body_medium_medium">
        {tag}:{' '}
        <span className="body_small_regular lg:body_medium_regular">
          {info}
        </span>
      </p>
    </div>
  )
}
