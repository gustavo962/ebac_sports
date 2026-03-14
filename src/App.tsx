import { useState } from 'react'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { useGetProdutosQuery } from './store/api'
import { GlobalStyle } from './styles'
import type { RootState } from './store/store'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const { data: produtos = [] } = useGetProdutosQuery()
  const carrinho = useSelector((state: RootState) => state.cart.items)
  const [favoritos, setFavoritos] = useState<Produto[]>([])

  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      const favoritosSemProduto = favoritos.filter((p) => p.id !== produto.id)
      setFavoritos(favoritosSemProduto)
    } else {
      setFavoritos([...favoritos, produto])
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
        />
      </div>
    </>
  )
}

export default App