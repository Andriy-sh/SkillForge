export interface DocsInterface {
  id: string;
  title: string;
  description: string;
  slug: string;
  resourceId: string;
  createdAt: Date;
  updatedAt: Date;
  resource?: { name: string };
}
