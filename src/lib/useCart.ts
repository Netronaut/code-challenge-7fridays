import { useSyncExternalStore } from "react";
import { Cart } from "./cart";
import { Product } from "./product";

let listeners: Array<() => {}> = [];
let snapshotKey: string | null = null;
let snapshot: Cart | null = null;

const cartStore = {
  getSnapshot(): Cart | null {
    const storage = localStorage.getItem("cart");

    if (snapshotKey === storage) {
      return snapshot;
    }
    snapshotKey = storage;
    snapshot = storage ? JSON.parse(storage) : null;
    return snapshot;
  },

  update(items: Cart) {
    snapshot = [...items];
    snapshotKey = JSON.stringify(snapshot);
    localStorage.setItem("cart", snapshotKey);
  },

  change(product: Product, count = 1) {
    let items = this.getSnapshot() || [];
    if (items.find((item) => item.product.id === product.id)) {
      items = items.map((item) =>
        item.product.id === product.id
          ? { ...item, count: item.count + count }
          : item
      );
    } else {
      items.push({ count, product });
    }

    this.update(items);
    this.emitChange();
  },

  remove(product: Product) {
    let items = this.getSnapshot() || [];
    this.update(items.filter((item) => item.product.id !== product.id));
    this.emitChange();
  },

  subscribe(listener: any) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  emitChange() {
    for (let listener of listeners) {
      listener();
    }
  },
};

export function useCart() {
  const cart = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    () => null
  );
  return { cartStore, cart };
}
