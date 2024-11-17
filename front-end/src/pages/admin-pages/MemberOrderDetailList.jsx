import React from "react";

import { format } from 'date-fns'
import { ChevronDown, ChevronUp, Package } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import api from "@/config/axios";
import { useState, useEffect } from "react";

const member = [
    {
        username: admin
    }
]

const orders = [
  {
    id: '1234',
    date: new Date('2023-11-15'),
    total: 12,
    status: 'Delivered',
    items: [
      { name: 'shoe', quantity: 1, price: 4},
      { name: 'shoe', quantity: 1, price: 4},
      { name: 'shoe', quantity: 2, price: 4},
    ],
  },
  {
    id: '5678',
    date: new Date('2023-11-20'),
    total: 8,
    status: 'Processing',
    items: [
      { name: 'shoe', quantity: 1, price: 4},
      { name: 'shoe', quantity: 2, price: 4},
    ],
  },
]

export default function OrderDetailList() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{member.username} Orders List</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}

function OrderCard({ order }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Order #{order.id}</span>
          <span className={`text-sm px-2 py-1 rounded ${
            order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {order.status}
          </span>
        </CardTitle>
        <CardDescription>
          Placed on {format(order.date, 'MMMM d, yyyy')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total: VND {order.total.toFixed(3)}</span>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline">
                {isOpen ? (
                  <>
                    Hide Details
                    <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    View Details
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.name} x{item.quantity}</span>
                    <span>VND {(item.price * item.quantity).toFixed(3)}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Package className="mr-2 h-4 w-4" />
          <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
        </div>
      </CardContent>
    </Card>
  )
}