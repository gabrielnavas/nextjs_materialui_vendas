import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Row } from "./useGetAllClientHook";

type Props = {
  rowsIDSelected: number[]
  rows: Row[]
  getRowOnUpdate(row:Row): void
}

const useUpdateUpdateClientHook = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
 
  const formik = useFormik({
    initialValues: {
      id: 0,
      name: '',
      phone: '',
    },
    validate: ({name, phone}) => {
      const errors = {} as Row
      if (name.length < 2) {
        errors.name='Nome muito pequeno.'
      }
      if (name.length < 2) {
        errors.name='Nome muito grande.'
      }
      if (phone.length < 8) {
        errors.phone='Telefone muito pequeno.'
      }
      if (phone.length < 2) {
        errors.phone='Telefone muito grande.'
      }
      
      return errors
    },
    onSubmit: async ({id, name, phone}) => {
      setIsLoading(true)
      const response = await fetch(`http://localhost:8000/client/${id}`, {
        method: "PUT",
        headers: {
          "accept": 'application/json',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ name, phone })
      })
      const data = await response.json()
      setIsLoading(false)
      if (response.status !== 200) {
        return console.error(data.detail)
      }
      props.getRowOnUpdate({
        id: data.id, name: data.name, phone: data.phone
      })
      formik.resetForm()
    },
  });

  useEffect(() => {
    const rowsToUpdate = props.rows.find(r => r.id === (props.rowsIDSelected[0] || 0))
    if(rowsToUpdate) {
      formik.setValues({
        id: rowsToUpdate.id || 0,
        name: rowsToUpdate.name,
        phone: rowsToUpdate.phone
      })
    }
  }, [props.rowsIDSelected])

  console.log(formik.values);

  return {
    values: formik.values, 
    handleChange: formik.handleChange, 
    errors: formik.errors, 
    handleUpdate: formik.handleSubmit,
    isLoading
  }
}

export default useUpdateUpdateClientHook