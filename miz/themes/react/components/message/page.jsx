import * as React from "react";

function MessageGroup({ className = "", ...props }) {
  return (
    <div
      data-slot="message-group"
      className={`message-group ${className}`}
      {...props}
    />
  );
}

function Message({
  className = "",
  align = "start",
  ...props
}) {
  return (
    <div
      data-slot="message"
      data-align={align}
      className={`message ${className}`}
      {...props}
    />
  );
}

function MessageAvatar({ className = "", ...props }) {
  return (
    <div
      data-slot="message-avatar"
      className={`message-avatar ${className}`}
      {...props}
    />
  );
}

function MessageContent({ className = "", ...props }) {
  return (
    <div
      data-slot="message-content"
      className={`message-content ${className}`}
      {...props}
    />
  );
}

function MessageHeader({ className = "", ...props }) {
  return (
    <div
      data-slot="message-header"
      className={`message-header ${className}`}
      {...props}
    />
  );
}

function MessageFooter({ className = "", ...props }) {
  return (
    <div
      data-slot="message-footer"
      className={`message-footer ${className}`}
      {...props}
    />
  );
}

export {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
};