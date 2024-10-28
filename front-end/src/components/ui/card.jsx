<<<<<<< HEAD



// src/components/ui/card.jsx
// Card.jsx
// export function Card({ className, children }) {
//   return (
//     <div className={`card ${className}`}>
//       {children}
//     </div>
//   );
// }

  
//   export function CardHeader({ children }) {
//     return (
//       <div className="card-header">
//         {children}
//       </div>
//     );
//   }
  
//   export function CardTitle({ children }) {
//     return (
//       <h2 className="card-title">
//         {children}
//       </h2>
//     );
//   }
  
//   export function CardDescription({ children }) {
//     return (
//       <p className="card-description">
//         {children}
//       </p>
//     );
//   }
  
//   export function CardContent({ children }) {
//     return (
//       <div className="card-content">
//         {children}
//       </div>
//     );
//   }
  
//   export function CardFooter({ children }) {
//     return (
//       <div className="card-footer">
//         {children}
//       </div>
//     );
//   }
  // Card.jsx


  



=======

>>>>>>> 7d89114ea6c1409a4d7707cf1b57df0d536e3f1d
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

