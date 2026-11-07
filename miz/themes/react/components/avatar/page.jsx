"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cn } from "cn"

function Avatar({
  className,
  size = "default",
  ...props
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "avatar",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "avatar-image",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "avatar-fallback",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "avatar-badge",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "avatar-group",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({ className, ...props }) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "avatar-group-count",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}






//--------------------نحوه استفاده در صفحه--------------------//
{/* <Avatar size="default">
      <AvatarImage src="https://example.com/avatar.jpg"  alt="User profile" />
      <AvatarFallback>JD</AvatarFallback>

      <AvatarBadge />
  </Avatar> */}