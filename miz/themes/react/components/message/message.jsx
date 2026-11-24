
function Message({ align = "start", className, ...props }) {
  return (
    <div
      data-slot="message"
      data-align={align}
      className={utils.cn("message", className)}
      {...props}
    />
  );
}

function MessageGroup({ className, ...props }) {
  return (
    <div
      data-slot="message-group"
      className={utils.cn("message-group", className)}
      {...props}
    />
  );
}

function MessageAvatar({ className, ...props }) {
  return (
    <div
      data-slot="message-avatar"
      className={utils.cn("message-avatar", className)}
      {...props}
    />
  );
}

function MessageContent({ className, ...props }) {
  return (
    <div
      data-slot="message-content"
      className={utils.cn("message-content", className)}
      {...props}
    />
  );
}

function MessageHeader({ className, ...props }) {
  return (
    <div
      data-slot="message-header"
      className={utils.cn("message-header", className)}
      {...props}
    />
  );
}

function MessageFooter({ className, ...props }) {
  return (
    <div
      data-slot="message-footer"
      className={utils.cn("message-footer", className)}
      {...props}
    />
  );
}

export {
  Message,
  MessageGroup,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageFooter,
};
