
import React from "react";

export default function VariantShoe({variants, onVariantChange}) {
  const sizes = [
    {
      id: 1,
      size_number: 6,
    },
    {
      id: 2,
      size_number: 6.5,
    },
    {
      id: 3,
      size_number: 7,
    },
  ];


  const handleVariantChange = (size, quantity) => {
    onVariantChange({
      sizeId: size.id,
      stockQuantity: parseInt(quantity) || 0
    })
  }



  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Variants</h2>
      <div className="grid grid-cols-3 gap-4">
        {sizes.map((size) => (
          <div key={size.id} className="flex flex-col">
            <label htmlFor={`size-${size}`} className="font-medium mb-1">
              Size {size.size_number}
            </label>
            <input
              type="number"
              id={`size-${size.id}`}
              min={1}
              value={variants.find(v => v.sizeId === size.id)?.stockQuantity || ""}
              onChange={(e) => handleVariantChange(size, e.target.value)}
              placeholder="Quantity"
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
