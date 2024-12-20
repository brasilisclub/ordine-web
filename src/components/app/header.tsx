import { RouteProps } from "@/types/route";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

function renderLinks(links: RouteProps[]) {
  return links.map(({ label, href }) => (
    <slot key={label + "-slot"}>
      <BreadcrumbItem key={label + "-item"} className="hidden md:block">
        <BreadcrumbLink key={label} href={href}>
          {label}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator
        key={label + "-separator"}
        className="hidden md:block"
      />
    </slot>
  ));
}

function renderPage(page: RouteProps) {
  return (
    <BreadcrumbItem key={page?.label + "-item"} className="hidden md:block">
      <BreadcrumbPage key={page?.label}>{page?.label}</BreadcrumbPage>
    </BreadcrumbItem>
  );
}

export default function Header({
  page,
  links,
}: {
  page: RouteProps;
  links?: RouteProps[];
}) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {links ? renderLinks(links) : null}
          {renderPage(page)}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
