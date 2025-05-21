export enum ProductCategory {
  NOTES = "notes",
  ASSIGNMENTS = "assignments",
  PAPERS = "papers",
  LAB_FILES = "lab_files",
  RESEARCH = "research",
  PROJECTS = "projects",
  SOURCE_CODE = "source_code",
  OTHER = "other",
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: ProductCategory
  subject: string
  university?: string
  previewImage?: string
  fileUrl?: string
  sellerId: string
  featured: boolean
  approved: boolean
  rating?: number
  reviewCount?: number
  createdAt: Date
  updatedAt: Date
}
