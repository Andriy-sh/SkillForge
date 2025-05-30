export interface Paragraph {
  id: string;
  content: string;
  order: number;
  taskId: string;
  bulletList?: BulletList[];
}

interface BulletList {
  id: string;
  content: string;
  order: number;
  paragraphId: string;
}
