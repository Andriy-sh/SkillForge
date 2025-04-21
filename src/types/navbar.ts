export interface NavbarConfig {
  label: string;
  href: string;
  dropdown?: boolean;
  dropdownItems?: NavbarConfig[];
}
