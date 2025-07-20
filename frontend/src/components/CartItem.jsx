import { useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";

const CartItem = ({ item, onUpdate ,removeFromCart}) => {
  const { id, quantity } = item;

  const increase = () => onUpdate(id, 1);
  const decrease = () => onUpdate(id, -1);
  return (
    <div className="flex items-center justify-between bg-white dark:bg-[var(--card-bg)] gap-2 py-2 px-1 mx-1 rounded-2xl">
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="sm:w-30 w-20 sm:h-35 h-23 object-cover rounded-lg"
      />

      {/* Info */}
      <div className="flex-1 sm:px-4 w-[10%]">
        <div className="flex items-center justify-between">
          <h3 className=" sm:text-lg ">{item.title}</h3>
          {/* Delete */}
          <button
            onClick={() => removeFromCart(id)}
            className=" text-red-500 hover:text-red-700 self-start"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-500">
          <span className="text-black px-1">Size: </span>
          {item.size}
        </p>

        <p className="text-sm text-gray-500">
          <span className="text-black px-1">Color: </span>
          {item.color}
        </p>

        <div className="flex items-center justify-between w-full">
          <p className=" text-lg mt-2">${item.price}</p>
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={decrease}
              className="w-8 h-8 max-[425px]:w-6 max-[425px]:h-6 flex items-center justify-center rounded-full bg-gray-100 text-xl"
            >
              <Minus size={16} className="dark:invert" />
            </button>
            <span>{quantity}</span>
            <button
              onClick={increase}
              className="w-8 h-8 max-[425px]:w-6 max-[425px]:h-6 flex items-center justify-center rounded-full bg-gray-100 text-xl"
            >
              <Plus size={16} className="dark:invert" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
