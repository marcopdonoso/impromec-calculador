import Breadcrumbs from '@/components/Breadcrumbs'
import ProfileForm from './components/ProfileForm'

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <div className="hidden lg:block">
        <Breadcrumbs />
      </div>
      <div className="px-2 pb-20 pt-14 lg:px-28 lg:pt-16">
        <ProfileForm />
      </div>
    </div>
  )
}
