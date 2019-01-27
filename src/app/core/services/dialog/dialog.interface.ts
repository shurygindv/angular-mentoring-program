export interface DialogData {
  title?: string;
  description?: string;
}

export interface ConfirmationDialogData<T = {}> extends DialogData {
  onCancel?(): void;
  onSubmit(payload?: T): void;
}
