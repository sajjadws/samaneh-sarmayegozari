"use client";

import { useState } from "react";

import { Button } from "@/miz/themes/react/";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/miz/themes/react/";
import "@/lib/globals-client";

export default function DropdownMenuExample() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [position, setPosition] = useState("bottom");

  return (
    <div>
      {/* Default */}
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline">Open Menu</Button>} />

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem>Billing</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Invite Members</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem variant="destructive">
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Checkbox Items */}
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline">View Options</Button>} />

        <DropdownMenuContent>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>

          <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
            Status Bar
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
            Activity Bar
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Radio Items */}
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline">Position</Button>} />

        <DropdownMenuContent>
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>

          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Submenu */}
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline">More Actions</Button>} />

        <DropdownMenuContent>
          <DropdownMenuItem>New File</DropdownMenuItem>
          <DropdownMenuItem>Open File</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger side="left">Share</DropdownMenuSubTrigger>

            <DropdownMenuSubContent side="left">
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
              <DropdownMenuItem>Share with Team</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>

            <DropdownMenuSubContent>
              <DropdownMenuItem>PDF</DropdownMenuItem>
              <DropdownMenuItem>Excel</DropdownMenuItem>
              <DropdownMenuItem>CSV</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Alignment and Size */}
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline">Small Menu</Button>} />

        <DropdownMenuContent align="end" side="bottom" sideOffset={6} className="dropdown-menu-content-sm">
          <DropdownMenuItem>Option One</DropdownMenuItem>
          <DropdownMenuItem>Option Two</DropdownMenuItem>
          <DropdownMenuItem>Option Three</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
