
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

function PaginationContent({ className, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={utils.cn("pagination-content", className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }) {
  return (
    <li
      data-slot="pagination-item"
      className={utils.cn("pagination-item", className)}
      {...props}
    />
  );
}

function PaginationLink({
  className,
  isActive = false,
  size = "default",
  ...props
}) {
  return (
    <a
      data-slot="pagination-link"
      data-active={isActive ? "true" : undefined}
      aria-current={isActive ? "page" : undefined}
      className={utils.cn(
        "pagination-link",
        `pagination-link-size-${size}`,
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  text = "Previous",
  size = "default",
  rtl = false,
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={utils.cn("pagination-previous", className)}
      size={size}
      {...props}
    >
      {
        rtl ? (<ChevronRight aria-hidden="true" />) : (<ChevronLeft aria-hidden="true" />)
      }
      {text && <span>{text}</span>}
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "Next",
  size = "default",
  rtl = false,
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={utils.cn("pagination-next", className)}
      size={size}
      {...props}
    >
      {text && <span>{text}</span>}
            {
        rtl ? (<ChevronLeft aria-hidden="true" />) : (<ChevronRight aria-hidden="true" />)
      }
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      data-slot="pagination-ellipsis"
      aria-hidden="true"
      className={utils.cn("pagination-ellipsis", className)}
      {...props}
    >
      <MoreHorizontal />
      <span className="pagination-sr-only">More pages</span>
    </span>
  );
}

function Pagination({ className, ...props }) {
  return (
    <nav
      data-slot="pagination"
      aria-label="pagination"
      className={utils.cn("pagination", className)}
      {...props}
    />
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
