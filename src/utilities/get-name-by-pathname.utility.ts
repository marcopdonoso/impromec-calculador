import { appLinks, authLinks } from '@/constants/links.constants'

type AppLinks = typeof appLinks
type AppLinkKey = keyof AppLinks

type AuthLinks = typeof authLinks
type AuthLinkKey = keyof AuthLinks

export const getNameByPathname = (pathname: string) => {
  for (const key in appLinks) {
    if (appLinks[key as AppLinkKey].path === pathname)
      return appLinks[key as AppLinkKey].name
  }
  for (const key in authLinks) {
    if (authLinks[key as AuthLinkKey].path === pathname)
      return authLinks[key as AuthLinkKey].name
  }
  return null
}
