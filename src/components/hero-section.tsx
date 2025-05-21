import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-sky-50 to-white py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Buy and Sell Study Materials with <span className="text-sky-600">Notely</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-[600px]">
              A student marketplace for handwritten notes, solved assignments, previous year papers, and more. Learn
              better, earn better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-8 -left-8 h-72 w-72 bg-sky-100 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute -bottom-8 -right-8 h-72 w-72 bg-sky-200 rounded-full blur-3xl opacity-70"></div>
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
              <img src="/placeholder.svg?height=400&width=600" alt="Students using Notely" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
