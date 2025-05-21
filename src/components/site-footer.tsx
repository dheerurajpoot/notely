import Link from "next/link"
import { BookOpen, Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <BookOpen className="h-5 w-5 text-sky-600" />
              <span>Notely</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A student marketplace for buying and selling high-quality study materials.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-sky-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-sky-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-sky-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">For Students</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/browse" className="text-muted-foreground hover:text-sky-600">
                  Browse Materials
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-sky-600">
                  How to Buy
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-muted-foreground hover:text-sky-600">
                  Student Reviews
                </Link>
              </li>
              <li>
                <Link href="/discounts" className="text-muted-foreground hover:text-sky-600">
                  Student Discount
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">For Sellers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sell" className="text-muted-foreground hover:text-sky-600">
                  Start Selling
                </Link>
              </li>
              <li>
                <Link href="/seller-guidelines" className="text-muted-foreground hover:text-sky-600">
                  Seller Guidelines
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-sky-600">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-muted-foreground hover:text-sky-600">
                  Seller Success Stories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-sky-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-sky-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-sky-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-sky-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Notely. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
