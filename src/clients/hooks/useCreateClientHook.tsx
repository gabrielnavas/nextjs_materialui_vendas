import { useState } from 'react'
import { useFormik } from 'formik'
import { Row } from './useGetAllClientHook'

type Props = {
  getRowOnSubmit(row:Row): void
}

const useCreateUpdateClientHook = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: ''
    },
    validate: ({ name, phone }) => {
      const errors = {} as Row
      if (name.length < 2) {
        errors.name = 'Nome muito pequeno.'
      }
      if (name.length < 2) {
        errors.name = 'Nome muito grande.'
      }
      if (phone.length < 8) {
        errors.phone = 'Telefone muito pequeno.'
      }
      if (phone.length < 2) {
        errors.phone = 'Telefone muito grande.'
      }

      return errors
    },
    onSubmit: async ({ name, phone }) => {
      setIsLoading(true)
      const response = await fetch('http://localhost:8000/client', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone })
      })
      const data = await response.json()
      setIsLoading(false)
      if (response.status !== 201) {
        return console.error(data.detail)
      }

      props.getRowOnSubmit({
        id: data.id, name: data.name, phone: data.phone
      })
      formik.resetForm()
    }
  })

  return {
    values: formik.values,
    handleChange:
    formik.handleChange,
    errors: formik.errors,
    handleCreate: formik.handleSubmit,
    isLoading
  }
}

export default useCreateUpdateClientHook
