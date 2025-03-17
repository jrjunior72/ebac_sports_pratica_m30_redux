import { Produto as ProdutoType } from '../../App'
import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { adicionarAoCarrinho } from '../../store/carrinhoSlice'
import {
  adicionarAosFavoritos,
  removerDosFavoritos
} from '../../store/favoritosSlice'
import React from 'react'

// type Props = {
//   produto: ProdutoType
//   aoComprar: (produto: ProdutoType) => void
//   favoritar: (produto: ProdutoType) => void
//   estaNosFavoritos: boolean
// }

type Props = {
  produto: ProdutoType
  estaNosFavoritos: boolean
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

// const ProdutoComponent = ({
//   produto,
//   aoComprar,
//   favoritar,
//   estaNosFavoritos
// }: Props) => {
//   return (
//     <S.Produto>
//       <S.Capa>
//         <img src={produto.imagem} alt={produto.nome} />
//       </S.Capa>
//       <S.Titulo>{produto.nome}</S.Titulo>
//       <S.Prices>
//         <strong>{paraReal(produto.preco)}</strong>
//       </S.Prices>
//       <S.BtnComprar onClick={() => favoritar(produto)} type="button">
//         {estaNosFavoritos
//           ? '- Remover dos favoritos'
//           : '+ Adicionar aos favoritos'}
//       </S.BtnComprar>
//       <S.BtnComprar onClick={() => aoComprar(produto)} type="button">
//         Adicionar ao carrinho
//       </S.BtnComprar>
//     </S.Produto>
//   )
// }

const ProdutoComponent = ({ produto }: Props) => {
  const dispatch = useDispatch()

  // Verifica se o produto está nos favoritos
  const estaNosFavoritos = useSelector((state: RootState) =>
    state.favoritos.itens.some((item) => item.id === produto.id)
  )

  // Função para adicionar ou remover dos favoritos
  const handleFavoritar = () => {
    if (estaNosFavoritos) {
      dispatch(removerDosFavoritos(produto.id))
    } else {
      dispatch(adicionarAosFavoritos(produto))
    }
  }

  // Função para adicionar ao carrinho
  const handleComprar = () => {
    dispatch(adicionarAoCarrinho(produto))
  }

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={handleFavoritar} type="button">
        {estaNosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar onClick={handleComprar} type="button">
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
