import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {type AlertDialogProps, BaseDeleteAlertDialog} from "@ienlab/react-library"

export default function DeleteAlertDialog(props: AlertDialogProps) {
  return (
    <BaseDeleteAlertDialog
      visible={props.visible}
      onVisibleChange={props.onVisibleChange}
      onConfirm={props.onConfirm}
      components={{ AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, Button }}
    />
  )
}