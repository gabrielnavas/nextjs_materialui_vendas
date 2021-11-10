import { useEffect, useState } from "react"


export type Row = {
  id?: number
  name: string
  phone: string 
}

const useGetAllClientHook = () => {
  const [rows, setRows] = useState<Row[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleInsertRow = (row: Row) => {
    setRows(old => [row,...old ])
  }
  const handleUpdateRow = (row: Row) => {
    setRows(old => old.map(element => element.id === row.id ? row : element))
  }

  const handleRemoveRowAfterDelete = (rowsID: number[]): void => {
    setRows(old => [
      ...old.filter(row => !rowsID.includes(row.id))
    ])
  }

  useEffect(() => {
    (async () => {
      const response = await fetch('http://127.0.0.1:8000/client?offset=0&limit=10', {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      })
      const data = await response.json()
      if (response.status !== 200) {
        console.error(data);
      }
      const rows = data.map(row => ({id: row.id, name:row.name, phone: row.phone}))
      setRows(rows)
    })()
  }, [])

  return {
    rows,
    handleInsertRow,
    handleUpdateRow,
    handleRemoveRowAfterDelete,
    isLoading
  }
}

export default useGetAllClientHook