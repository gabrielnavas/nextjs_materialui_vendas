import { useState } from 'react'
import { Row } from './useGetAllClientHook'

type Props = {
  rowsExist: Row[]
}

const useSearchClientHook = (props: Props) => {
  const [query, setQuery] = useState('')
  const [rowsFetched, setRowsFetched] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleOnSearch = e => {
    setQuery(e.target.value)
  }

  const handleOnSubmitSearch = () => {
    if (!query || query === '') {
      setRowsFetched([])
      return
    }
    (async () => {
      const rowsFromRepository = await handleFetchRows(query)
      setRowsFetched(rowsFromRepository)
    })()
  }

  const handleFetchRows = async (query: string): Promise<Row[]> => {
    setIsLoading(true)
    const noLimite = 0
    const url = `http://127.0.0.1:8000/client?name=${query}&phone=${query}&offset=0&limit=${noLimite}`
    const response = await fetch(url, {
      method: 'GET'
    })
    const data = await response.json()
    setIsLoading(false)
    if (response.status !== 200) {
      console.error(data)
      return
    }
    return data
  }

  const handleRemoveRowAfterDelete = (rowsID: number[]) => {
    setRowsFetched(old => [
      ...old.filter(row => !rowsID.includes(row.id))
    ])
  }

  return {
    handleOnSearch,
    handleOnSubmitSearch,
    handleRemoveRowAfterDelete,
    rowsFetched,
    isLoading,
    query
  }
}

export default useSearchClientHook
