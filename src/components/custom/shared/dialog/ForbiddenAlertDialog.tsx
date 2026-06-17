import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx"
import {useTranslation} from "react-i18next"

type Props = {
  visible: boolean
  onAction: () => void
}

export default function ForbiddenAlertDialog({visible, onAction}: Props) {
  const {t} = useTranslation()
  return (
    <AlertDialog open={visible}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("strings:forbidden_dialog.title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("strings:forbidden_dialog.desc")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onAction}>
            {t("strings:confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
