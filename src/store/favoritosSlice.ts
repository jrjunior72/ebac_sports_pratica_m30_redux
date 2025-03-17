// store/favoritosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../App'

interface FavoritosState {
  itens: Produto[]
}

const initialState: FavoritosState = {
  itens: []
}

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    adicionarAosFavoritos(state, action: PayloadAction<Produto>) {
      // Verifica se o produto já está nos favoritos
      const produtoJaExiste = state.itens.some(
        (item) => item.id === action.payload.id
      )

      // Se não existir, adiciona o produto aos favoritos
      if (!produtoJaExiste) {
        state.itens.push(action.payload)
      }
    },
    removerDosFavoritos(state, action: PayloadAction<number>) {
      // Remove o produto dos favoritos com base no ID
      state.itens = state.itens.filter((item) => item.id !== action.payload)
    }
  }
})

// Exporta as ações geradas automaticamente pelo createSlice
export const { adicionarAosFavoritos, removerDosFavoritos } =
  favoritosSlice.actions

// Exporta o reducer para ser usado na store
export default favoritosSlice.reducer
