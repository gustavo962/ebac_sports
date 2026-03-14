import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Produto } from '../App'

type CartState = {
  items: Produto[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Produto>) => {
      const itemExiste = state.items.find((p) => p.id === action.payload.id)

      if (!itemExiste) {
        state.items.push(action.payload)
      }
    }
  }
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer