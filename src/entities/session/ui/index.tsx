import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { LoginPage } from '@/screens/login'
import { RegistrationPage } from '@/screens/registration'
import { forwardRef } from 'react'
import { useAuthStore } from '@/entities/session/model'
import { useSession } from '@/entities/session/model/model'

export const AuthDialog = forwardRef<HTMLDivElement>((_, ref) => {
  const { isOpen, isLogin, openDialog, closeDialog, togglePage } =
    useAuthStore()
  const { isAuthenticated } = useSession()
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? openDialog() : closeDialog())}
    >
      {!isAuthenticated && (
        <DialogTrigger onClick={openDialog}>Авторизація</DialogTrigger>
      )}
      <DialogContent ref={ref} className="lg:w-[40%] w-full">
        {isLogin ? (
          <LoginPage togglePage={togglePage} />
        ) : (
          <RegistrationPage togglePage={togglePage} />
        )}
      </DialogContent>
    </Dialog>
  )
})

AuthDialog.displayName = 'AuthDialog'
