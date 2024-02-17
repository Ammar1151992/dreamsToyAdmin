import { create } from 'zustand'

export const useStore = create((set) => ({
  products: [],
  list: "category",
  isLogin: false,
  isOpen: false,
  upload: false,
  loading: false,
  selection: [],
  setProducts: (products) => set({ products }),
  setList: (list) => set({ list }),
  setIsLogin: (isLogin) => set({ isLogin }),
  setIsOpen: (isOpen) => set({ isOpen }),
  isUpload: (upload) => set({ upload }),
  setLoading: (loading) => set({ loading }),
  setSelection: (selection) => set({ selection }),
}))