export interface User {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  bio: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
