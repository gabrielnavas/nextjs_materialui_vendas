import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { ChangeEvent, MouseEvent } from 'react'

type Props = {
  name: {
    value: string
    error: string | undefined
    onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => any
  },
  phone: {
    value: string
    error: string | undefined
    onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => any
  }
  buttonSubmit: {
    text: string
    onSubmit: (e: MouseEvent<any>) => any
  }
  buttonCancel: {
    onCancel: (e: MouseEvent<any>) => any
  }
  isLoading: boolean
}

const Form = (props: Props) => {
  return (
    <Stack spacing={4}>
      <TextField
        id="name"
        label="Nome"
        variant="standard"
        error={!!props.name.error}
        helperText={props.name.error && props.name.error}
        onChange={props.name.onChange}
        value={props.name.value}
      />
      <TextField
        id="phone"
        label="Telefone"
        variant="standard"
        error={!!props.phone.error}
        helperText={props.phone.error && props.phone.error}
        onChange={props.phone.onChange}
        value={props.phone.value}
      />
      <Button
        variant="contained"
        onClick={props.buttonSubmit.onSubmit}
        disabled={props.isLoading}
      >{props.buttonSubmit.text}</Button>
      <Button
        variant="outlined"
        onClick={props.buttonCancel.onCancel}
      >Cancelar</Button>
    </Stack>
  )
}

export default Form
