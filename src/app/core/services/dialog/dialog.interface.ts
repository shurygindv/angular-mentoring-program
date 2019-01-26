export interface DialogData {
  title: string;
  description?: string;
}

export interface ConfirmationDialogData extends DialogData {
  onCancel?(): void;
  onConfirm(): void;
}
