"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Package, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { makePayment, createRazorpayOrder } from "@/lib/razorpay"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/lib/models"
import type { User } from "@/lib/models"

interface CheckoutFormProps {
  product: Product
  user: User
}

export function CheckoutForm({ product, user }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [deliveryType, setDeliveryType] = useState(product.deliveryType === "physical" ? "physical" : "digital")
  const [fullName, setFullName] = useState("")
  const [addressLine1, setAddressLine1] = useState("")
  const [addressLine2, setAddressLine2] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const router = useRouter()

  // Calculate total based on delivery type
  const basePrice = product.price
  const deliveryFee = deliveryType === "physical" ? product.physicalPrice || 5.99 : 0
  const totalPrice = basePrice + deliveryFee

  const handlePayment = async () => {
    try {
      setIsLoading(true)

      // Validate address for physical delivery
      if (deliveryType === "physical") {
        if (!fullName || !addressLine1 || !city || !state || !postalCode || !country || !phoneNumber) {
          alert("Please fill in all required address fields")
          setIsLoading(false)
          return
        }
      }

      // Create Razorpay order
      const order = await createRazorpayOrder(totalPrice, product.id)

      // Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YourTestKeyId",
        amount: order.amount,
        currency: order.currency,
        name: "Notely",
        description: `Payment for ${product.title}`,
        image: "/logo.png",
        order_id: order.id,
        prefill: {
          name: user.name,
          email: user.email,
          contact: phoneNumber || "",
        },
        notes: {
          productId: product.id,
          isPhysical: deliveryType === "physical",
        },
        theme: {
          color: "#0284c7",
        },
        handler: async (response: any) => {
          try {
            // Prepare delivery address if physical
            const deliveryAddress =
              deliveryType === "physical"
                ? {
                    fullName,
                    addressLine1,
                    addressLine2,
                    city,
                    state,
                    postalCode,
                    country,
                    phoneNumber,
                  }
                : undefined

            // Verify payment with backend
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                productId: product.id,
                isPhysical: deliveryType === "physical",
                deliveryAddress,
                deliveryFee: deliveryType === "physical" ? deliveryFee : undefined,
              }),
            })

            const data = await verifyResponse.json()

            if (data.success) {
              // Redirect to success page
              router.push(`/dashboard/purchases?success=true&orderId=${data.order.id}`)
            } else {
              alert("Payment verification failed. Please try again.")
            }
          } catch (error) {
            console.error("Error verifying payment:", error)
            alert("An error occurred while verifying your payment. Please contact support.")
          }
        },
      }

      // Open Razorpay payment form
      await makePayment(options)
    } catch (error) {
      console.error("Payment error:", error)
      alert("An error occurred while processing your payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>Complete your purchase for {product.title}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Delivery Options */}
        {product.deliveryType === "both" && (
          <div className="space-y-3">
            <Label>Delivery Option</Label>
            <RadioGroup value={deliveryType} onValueChange={setDeliveryType} className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="digital" id="digital" />
                <Label htmlFor="digital" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  <div>
                    <p>Digital Download</p>
                    <p className="text-sm text-muted-foreground">Instant access after payment</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="physical" id="physical" />
                <Label htmlFor="physical" className="flex items-center gap-2 cursor-pointer">
                  <Package className="h-4 w-4" />
                  <div>
                    <p>Physical Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      {product.physicalPrice
                        ? `Additional ${formatCurrency(product.physicalPrice)}`
                        : "Additional shipping fee applies"}
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Shipping Address for Physical Delivery */}
        {(deliveryType === "physical" || product.deliveryType === "physical") && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium">Shipping Address</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address-line-1">Address Line 1</Label>
                <Input
                  id="address-line-1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address-line-2">Address Line 2 (Optional)</Label>
                <Input id="address-line-2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" value={state} onChange={(e) => setState(e.target.value)} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input
                  id="phone-number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Product Price</span>
              <span>{formatCurrency(basePrice)}</span>
            </div>
            {deliveryType === "physical" && (
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handlePayment} disabled={isLoading} className="w-full bg-sky-600 hover:bg-sky-700">
          {isLoading ? "Processing..." : "Pay Now"}
        </Button>
      </CardFooter>
    </Card>
  )
}
