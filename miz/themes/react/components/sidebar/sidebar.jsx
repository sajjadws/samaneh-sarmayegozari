"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSidebarItems } from "@/components/config/admin-layout/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/miz/components/react/collapsible/page";
import { cn } from "cn";
import { IconMenu2, IconChevronLeft } from "@tabler/icons-react";

function isPathActive(pathname, href) {
  if (!pathname || !href) return false;

  const currentPath = pathname.replace(/\/$/, "") || "/";
  const targetPath = href.replace(/\/$/, "") || "/";

  return currentPath === targetPath || (targetPath !== "/" && currentPath.startsWith(`${targetPath}/`));
}

function hasActiveDescendant(item, pathname) {
  return (
    item.subList?.some((subItem) => {
      return isPathActive(pathname, subItem.link) || hasActiveDescendant(subItem, pathname);
    }) ?? false
  );
}

export default function Sidebar({ role, ...props }) {
  const pathname = usePathname();

  const [isClosed, setIsClosed] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const [hiddenTitles, setHiddenTitles] = useState(() => new Set());
  const [openItems, setOpenItems] = useState(() => new Set());

  const { asideClassName, titleClassName, linkClassName } = props;

  const items = useMemo(() => {
    return [...getSidebarItems()]
      .filter((item) => {
        return item.role === role;
      })
      .sort((a, b) => a.order - b.order);
  }, [role]);

  function isActive(href) {
    return isPathActive(pathname, href);
  }

  function getItemClassName(href, isParent = false) {
    const active = isParent
      ? isActive(href) || items.some((item) => item.link === href && hasActiveDescendant(item, pathname))
      : isActive(href);

    return cn(
      "link-item d-flex align-items-center radius-all-normal gap-2 overflow-hidden p-2",
      linkClassName,
      active ? "bg-on-primary-color primary-color" : "on-primary-color",
    );
  }

  useEffect(() => {
    const activeParents = items.filter((item) => hasActiveDescendant(item, pathname)).map((item) => item.link);

    setOpenItems(new Set(activeParents));
  }, [pathname, items]);

  function handleOpenChange(itemLink, open) {
    setOpenItems((previous) => {
      const next = new Set(previous);

      if (open) {
        next.add(itemLink);
      } else {
        next.delete(itemLink);
      }

      return next;
    });
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    function handleScreenChange(event) {
      if (event.matches) {
        setIsClosed(false);
        setIsOpening(true);
        setHiddenTitles(new Set());
      }
    }

    handleScreenChange(mediaQuery);

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  function handleCloseSideBar() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    if (isClosed) {
      setHiddenTitles(new Set());
      setIsClosed(false);
      setIsOpening(true);
    } else {
      setIsOpening(false);
      setIsClosed(true);
    }
  }

  function handleTitleAnimationEnd(event, itemLink) {
    if (event.target !== event.currentTarget) return;

    if (event.animationName === "FadeOut" && isClosed) {
      setHiddenTitles((previous) => {
        const next = new Set(previous);
        next.add(itemLink);

        return next;
      });
    }
  }

  return (
    <aside
      className={cn(
        "sidebar d-flex flex-column bg-primary-color align-items-md-center h-100 w-15 gap-3 overflow-hidden p-3",
        asideClassName,
        isClosed && "close",
        isOpening && "opening",
      )}
    >
      <div className="scrollbar-width-none overflow-scroll">
        <IconMenu2 onClick={handleCloseSideBar} color="white" size={24} stroke={1.8} className="cursor-pointer" />

        {items.map((item) => {
          const ItemIcon = item.icon;

          const parentIsActive = isActive(item.link) || hasActiveDescendant(item, pathname);

          return item.subList?.length > 0 ? (
            <Collapsible
              key={item.id ?? item.link}
              open={openItems.has(item.link)}
              onOpenChange={(open) => handleOpenChange(item.link, open)}
              className="d-flex flex-column gap-2"
            >
              <CollapsibleTrigger
                nativeButton={false}
                render={
                  <div
                    className={cn(
                      "link-item d-flex align-items-center radius-all-normal gap-2 overflow-hidden p-2",
                      linkClassName,
                      parentIsActive ? "bg-on-primary-color primary-color" : "on-primary-color",
                    )}
                  >
                    <ItemIcon size={22} stroke={1.8} />
                    <span
                      className={cn(
                        "title txt-size-normal d-md-none",
                        titleClassName,
                        hiddenTitles.has(item.link) ? "d-none" : "d-inline",
                      )}
                      onAnimationEnd={(event) => handleTitleAnimationEnd(event, item.link)}
                    >
                      {item.label}
                    </span>
                    <IconChevronLeft
                      size={18}
                      stroke={1.8}
                      className={cn("ms-auto", openItems.has(item.link) && "rotate-90")}
                    />
                  </div>
                }
              />

              <CollapsibleContent className="d-flex flex-column gap-2">
                {item.subList.map((subItem) => {
                  const SubItemIcon = subItem.icon;
                  return (
                    <Link
                      key={subItem.id ?? subItem.link}
                      href={subItem.link}
                      className={getItemClassName(subItem.link)}
                    >
                      <SubItemIcon size={20} stroke={1.8} />
                      <span
                        className={cn(
                          "title txt-size-subtitle d-md-none",
                          titleClassName,
                          hiddenTitles.has(subItem.link) ? "d-none" : "d-inline",
                        )}
                        onAnimationEnd={(event) => handleTitleAnimationEnd(event, subItem.link)}
                      >
                        {subItem.label}
                      </span>
                    </Link>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <Link key={item.id ?? item.link} href={item.link} className={getItemClassName(item.link)}>
              <ItemIcon size={22} stroke={1.8} />
              <span
                className={cn(
                  "title txt-size-normal d-md-none",
                  titleClassName,
                  hiddenTitles.has(item.link) ? "d-none" : "d-inline",
                )}
                onAnimationEnd={(event) => handleTitleAnimationEnd(event, item.link)}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
