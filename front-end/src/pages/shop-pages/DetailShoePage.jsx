import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import api from "@/config/axios";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store";
import { ToastContainer, toast } from "react-toastify";
import { selectItems } from "@/store/cart-slice";

export default function DetailShoePage() {
  const params = useParams();
  const id = params.id;

  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedVariant, setSelectedVariant] = React.useState(null);
  const [shoe, setShoe] = React.useState(null);

  const cartItems = useSelector(selectItems);


  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const { data } = await api.get(`shoes/${id}`);

        console.log(data.result);
        setShoe(data.result);

        // if (data.result?.variant?.length > 0) {
        //   setSelectedVariant(data.result.variants[0]);
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchShoe();
  }, [id]);

  const imagesShoe = shoe?.images;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select a size before adding to cart.", {
        autoClose: 2000,
      });
      return;
    }

    const cartItem = {
      id: shoe.id,
      name: shoe.name,
      price: shoe.price * 1000,
      imageUrl: shoe.images[0].url,
      quantity: quantity,
      variantId: selectedVariant.id,
      size: selectedVariant.sku.split('-').pop(),
      totalPrice: shoe.price * quantity
    };

    dispatch(cartActions.addItemToCart(cartItem));
    toast.success("Item added to cart", {
      autoClose: 2000,
    })
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      const maxAllowed = selectedVariant ? selectedVariant.stockQuantity : 1;
      
      // Check existing quantity in cart for this variant
      const existingCartItem = cartItems.find(
        item => item.id === shoe.id && item.variantId === selectedVariant?.id
      );
      const currentInCart = existingCartItem ? existingCartItem.quantity : 0;
      
      if (quantity + currentInCart < maxAllowed) {
        setQuantity((prev) => prev + 1);
      } else {
        toast.error(`Cannot add more than ${maxAllowed} items for this size`, {
          autoClose: 2000
        });
      }
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    // Check if there's already this variant in cart
    const existingCartItem = cartItems.find(
      item => item.id === shoe.id && item.variantId === variant.id
    );
    // Reset quantity to 1 when changing variant
    setQuantity(1);
  };

  if (!shoe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image section */}
        <div className="space-y-4">
          <div className="aspect-square relative">
            <img
              src={shoe.images[selectedImage]?.url}
              alt={shoe.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {imagesShoe.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded-md overflow-hidden ${
                  selectedImage === index
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image.url}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold capitalize">{shoe.name}</h1>
            <p className="text-gray-500">{shoe.description}</p>
            <p className="text-xl font-semibold mt-2">{shoe.price}.000đ</p>
          </div>
          <Card>
            <CardContent className="space-y-4 p-4">
              <div>
                <p className="font-medium mb-2">Size</p>
                <div className="flex gap-2">
                  {shoe.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantSelect(variant)}
                      className={
                        `w-10 h-10 border rounded-md transition-all duration-200` +
                        (selectedVariant?.id === variant.id
                          ? " bg-black text-white"
                          : " border-gray-200")
                      }
                      disabled={variant.stockQuantity === 0}
                    >
                      {variant.sku.split("-").pop()}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">Quantity:</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    className="p-2 border rounded-md"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="ư-12 text-center w-10">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    className="p-2 border rounded-md"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1 "
                  onClick={() => handleAddToCart(shoe)}
                >
                  Add to cart
                </Button>
                <Button variant="destructive" className="flex-1 ">
                  Buy now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
