import React from "react";

export default function VariantShoeOnUpdateForm({ variants, onVariantChange, updatedVariants }) {

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Cập Nhật kho giày</h2>
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => {
          const size = variant.sku.split("-").pop();
          return (
            <div key={variant.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex flex-col space-y-2">
                <label htmlFor={variant.id} className="font-medium">
                  Kích cỡ: {size}
                </label>
                <div className="text-sm text-gray-500">
                  Số lượng hiện tại: {variant.stockQuantity}
                </div>
                <input
                  type="number"
                  id={`size-${variant.id}`}
                  min="0"
                  value={updatedVariants[variant.id] ?? variant.stockQuantity}
                  onChange={(e) => onVariantChange(variant.id, parseInt(e.target.value) || 0)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
