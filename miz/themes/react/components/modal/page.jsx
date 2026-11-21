import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/miz/components/react/dialog/page";


export function Modal({ title, description, open, onOpenChange, children }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger />
      <DialogContent className="w-fit-content">
        {children}
      </DialogContent>
    </Dialog>
  );
}
