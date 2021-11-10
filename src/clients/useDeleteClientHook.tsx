import { useState } from "react"

type Props = {
  handleRowRemoveFromUI(rowsID: number[]): void
  handleRowRemoveSearchUI(rowsID: number[]): void
}

const useDeleteClientHook = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRemoveRows = async (rowsID: number[]): Promise<void> => {
    let error = false
    
    for (const id of rowsID) {
      const response = await fetch(`http://127.0.0.1:8000/client/${id}`, {
        method: 'DELETE'
      })
      if(response.status !== 204) {
        const data = await response.json()
        console.error(data);
        error = true
        break
      } 
    }
    if(!error) {
      props.handleRowRemoveFromUI(rowsID)
      props.handleRowRemoveSearchUI(rowsID)
    }
  }
 
  
  return {
    isLoading,
    handleRemoveRows
  }
}

export default useDeleteClientHook