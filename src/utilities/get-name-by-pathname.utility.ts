import { appLinks } from '@/constants/links.constants'

type AppLinks = typeof appLinks
type AppLinkKey = keyof AppLinks

export const getNameByPathname = (pathname: string) => {
  for (const key in appLinks) {
    if (appLinks[key as AppLinkKey].path === pathname)
      return appLinks[key as AppLinkKey].name
  }
  return null
}
