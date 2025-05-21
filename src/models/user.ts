export enum UserRole {
  USER = "user",
  SELLER = "seller",
  ADMIN = "admin",
}

export interface User {
  id: string
  name: string
  email: string
  password: string // This would be hashed in a real application
  role: UserRole
  university?: string
  bio?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}
