import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [
    // Pre-populated demo items for testing UI immediately
    {
      id: "demo-1",
      name: "Pocky Strawberry Cookie Crisp",
      slug: "pocky-strawberry-cookie-crisp",
      price: 2490,
      image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=600&auto=format&fit=crop",
      category: "Snacks",
      quantity: 2,
      stock: 15,
    },
    {
      id: "demo-2",
      name: "Peluche Mochi Cat Jumbo Pink",
      slug: "peluche-mochi-cat-jumbo-pink",
      price: 14990,
      image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=600&auto=format&fit=crop",
      category: "Peluches",
      quantity: 1,
      stock: 5,
    },
  ],
  addItem: (product, qty = 1) => {
    set((state) => {
      const existingIndex = state.items.findIndex((i) => i.id === product.id);
      if (existingIndex > -1) {
        const updated = [...state.items];
        const newQty = updated[existingIndex].quantity + qty;
        updated[existingIndex].quantity = Math.min(newQty, product.stock);
        return { items: updated };
      }
      return {
        items: [...state.items, { ...product, quantity: Math.min(qty, product.stock) }],
      };
    });
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items
        .map((item) => {
          if (item.id === id) {
            const validQty = Math.max(1, Math.min(quantity, item.stock));
            return { ...item, quantity: validQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotalItems: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },
  getTotalPrice: () => {
    return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
}));
