// import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import React from 'react'
import { useGetProdutosQuery } from '../services/api'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

import * as S from './styles'

// type Props = {
//   produtos: ProdutoType[]
//   favoritos: ProdutoType[]
//   adicionarAoCarrinho: (produto: ProdutoType) => void
//   favoritar: (produto: ProdutoType) => void
// }

const ProdutosComponent = () => {
  // Busca a lista de produtos da API usando RTK Query
  const { data: produtos, isLoading } = useGetProdutosQuery()

  // const ProdutosComponent = ({
  //   produtos,
  //   favoritos,
  //   adicionarAoCarrinho,
  //   favoritar
  // }: Props) => {
  //   const produtoEstaNosFavoritos = (produto: ProdutoType) => {
  //     const produtoId = produto.id
  //     const IdsDosFavoritos = favoritos.map((f) => f.id)

  //     return IdsDosFavoritos.includes(produtoId)
  //   }

  // Acessa a lista de favoritos do estado global
  const favoritos = useSelector((state: RootState) => state.favoritos.itens)

  // Verifica se um produto está nos favoritos
  const produtoEstaNosFavoritos = (produtoId: number) => {
    return favoritos.some((favorito) => favorito.id === produtoId)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <S.Produtos>
      {produtos?.map((produto) => (
        <Produto
          key={produto.id}
          produto={produto}
          estaNosFavoritos={produtoEstaNosFavoritos(produto.id)}
        />
      ))}
    </S.Produtos>
  )
}

//   return (
//     <>
//       <S.Produtos>
//         {produtos.map((produto) => (
//           <Produto
//             estaNosFavoritos={produtoEstaNosFavoritos(produto)}
//             key={produto.id}
//             produto={produto}
//             favoritar={favoritar}
//             aoComprar={adicionarAoCarrinho}
//           />
//         ))}
//       </S.Produtos>
//     </>
//   )
// }

export default ProdutosComponent
