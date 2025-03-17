import * as S from './styles'
import React from 'react'
// import { Produto } from '../../App'

import cesta from '../../assets/cesta.png'
import { paraReal } from '../Produto'

import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

// type Props = {
//   itensNoCarrinho: Produto[]
//   favoritos: Produto[]
// }

// const Header = ({ itensNoCarrinho, favoritos }: Props) => {
//   const valorTotal = itensNoCarrinho.reduce((acc, item) => {
//     acc += item.preco
//     return acc
//   }, 0)

const Header = () => {
  const itensNoCarrinho = useSelector(
    (state: RootState) => state.carrinho.itens
  )
  const favoritos = useSelector((state: RootState) => state.favoritos.itens) // Assumindo que você também tem um slice para favoritos

  const valorTotal = itensNoCarrinho.reduce((acc, item) => {
    acc += item.preco
    return acc
  }, 0)

  return (
    <S.Header>
      <h1>EBAC Sports</h1>
      <div>
        <span>{favoritos.length} favoritos</span>
        <img src={cesta} />
        <span>
          {itensNoCarrinho.length} itens, valor total: {paraReal(valorTotal)}
        </span>
      </div>
    </S.Header>
  )
}

export default Header
