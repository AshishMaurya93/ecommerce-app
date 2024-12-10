'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'
import productsData from '@/data/products.json'

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setProducts(productsData)
  }, [])

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      router.push('/signin')
      return
    }
    addItem({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{product.category}</Badge>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{product.rating.rate}</span>
                    <span className="text-xs text-muted-foreground ml-1">({product.rating.count})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
                  <Button onClick={() => handleAddToCart(product)} size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

