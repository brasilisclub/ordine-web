export interface RouteProps {
  label: string;
  type?: "link" | "page";
  href?: string;
}
export interface BreadCrumbItemProps {
  key: string;
  label: string;
  href?: string;
}
