import React, { useState } from "react";
import { useEffect } from "react";
import api from "@/config/axios";

export default function VariantShoe({ variants, onVariantChange }) {
  
  const [sizes, setSize] = useState([]);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const { data } = await api.get("shoes/sizes");
        console.log(data.result);
        
        setSize(data.result);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    }
    fetchSizes();
  }, [])

  const handleVariantChange = (size, quantity) => {
    onVariantChange({
      sizeId: size.id,
      stockQuantity: parseInt(quantity) || 0,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Variants</h2>
      <div className="grid grid-cols-3 gap-4">
        {sizes.map((size) => (
          <div key={size.id} className="flex flex-col">
            <label htmlFor={`size-${size}`} className="font-medium mb-1">
              Size {size.sizeNumber}
            </label>
            <input
              type="number"
              id={`size-${size.id}`}
              min={1}
              value={
                variants.find((v) => v.sizeId === size.id)?.stockQuantity || ""
              }
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
