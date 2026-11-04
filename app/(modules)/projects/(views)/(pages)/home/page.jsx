"use client";

import { Button } from "@/miz/themes/react/components/button/page";
import { toast, Toaster } from "@/miz//themes/react/components/toast/page";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/miz/themes/react/components/dialog/page";
import { Field, FieldGroup } from "@/miz/themes/react/components/field/page";
import { Input } from "@/miz/themes/react/components/input/page";
import { Label } from "@/miz/themes/react/components/label/page";

export default function ToastDemo() {
	function showToast() {
		const id = toast.add({
			title: "Event created",
			description: "Sunday, December 3 at 9:00 AM",
			actionProps: {
				children: "Undo",
				onClick() {
					toast.close(id);
				},
			},
		});
	}

	return (
		<>
			<Button variant="outline" onClick={showToast}>
				Show Toast
			</Button>

			<Toaster />
		</>
	);
}

// export default function DialogDemo() {
//   return (
//     <Dialog>
//       <form>
//         <DialogTrigger render={<Button variant="outline">Open Dialog</Button>} />
//         <DialogContent className="sm:max-w-sm">
//           <DialogHeader>
//             <DialogTitle>Edit profile</DialogTitle>
//             <DialogDescription>
//               Make changes to your profile here. Click save when you&apos;re
//               done.
//             </DialogDescription>
//           </DialogHeader>
//           <FieldGroup>
//             <Field>
//               <Label htmlFor="name-1">Name</Label>
//               <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
//             </Field>
//             <Field>
//               <Label htmlFor="username-1">Username</Label>
//               <Input id="username-1" name="username" defaultValue="@peduarte" />
//             </Field>
//           </FieldGroup>
//           <DialogFooter>
//             <DialogClose render={<Button variant="outline">Cancel</Button>} />
//             <Button type="submit">Save changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   )
// }
