'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin?redirect=/cart')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Add some products to your cart to see them here.
          </p>
          <Button onClick={() => router.push('/')} className="mt-4">
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <h1 className="mb-8 text-2xl font-bold">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg border bg-card p-4"
              >
                <div className="relative h-24 w-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        ${item.price}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(0, item.quantity - 1))
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
          <Button className="mt-4 w-full">Checkout</Button>
        </div>
      </div>
    </div>
  )
}

