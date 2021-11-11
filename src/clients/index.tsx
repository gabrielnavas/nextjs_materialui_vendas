import { SyntheticEvent, useState } from 'react'
import Head from 'next/head'

import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import {
  Container,
  Content,
  PaperCustom
} from './styles'

import TopBarAuthenticated from '../shared/components/TopBarAuthenticated'
import DataTable from './components/DataTable'
import TabPanel from './components/TabPanel'

import useCreateClientHook from './hooks/useCreateClientHook'
import useUpdateClientHook from './hooks/useUpdateClientHook'
import useGetAllClientHook from './hooks/useGetAllClientHook'
import useDeleteClientHook from './hooks/useDeleteClientHook'
import useSearchClientHook from './hooks/useSearchClientHook'

const ClientsPage = () => {
  const [rowsIDSelected, setRowsIDSelected] = useState([] as number[])
  const [valueTab, setValueTab] = useState(0)

  const {
    rows,
    handleInsertRow,
    handleUpdateRow,
    isLoading: isLoadingGetAll,
    handleRemoveRowAfterDelete
  } = useGetAllClientHook()

  const {
    handleOnSearch,
    handleOnSubmitSearch,
    handleRemoveRowAfterDelete: handleRemoveRowAfterDeleteSearch,
    rowsFetched,
    query
  } = useSearchClientHook({ rowsExist: rows })

  const {
    values,
    errors,
    handleChange,
    handleCreate,
    isLoading: isLoadingCreate
  } = useCreateClientHook({ getRowOnSubmit: handleInsertRow })

  const {
    values: valuesToUpdate,
    errors: errorsToUpdate,
    handleChange: handleChangeToUpdate,
    handleUpdate,
    isLoading: isLoadingUpdate
  } = useUpdateClientHook({
    getRowOnUpdate: handleUpdateRow,
    rowsIDSelected,
    rows
  })

  const {
    isLoading: isLoadingDelete,
    handleRemoveRows
  } = useDeleteClientHook({
    handleRowRemoveFromUI: handleRemoveRowAfterDelete,
    handleRowRemoveSearchUI: handleRemoveRowAfterDeleteSearch
  })

  const isLoading =
    isLoadingGetAll ||
    isLoadingCreate ||
    isLoadingCreate ||
    isLoadingDelete ||
    isLoadingUpdate

  const handleChangeValueTab = (event: SyntheticEvent, newValue: number) => {
    setValueTab(newValue)
  }

  const handleRowsSelected = (allRowsID: number[]): void => {
    setRowsIDSelected(allRowsID)
  }

  const handleSetupListValueTab = () => {
    setValueTab(0)
  }
  const handleSetupUpdateValueTab = () => {
    setValueTab(2)
  }

  return (
    <>
     <Head>
        <title>Gerenciamento de Clients</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <TopBarAuthenticated />
        <Content>
          <PaperCustom elevation={0}>
            <Typography variant="h5" gutterBottom component="div">
              Clientes
            </Typography>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={valueTab} onChange={handleChangeValueTab} aria-label="basic tabs example">
                  <Tab label="Listar" />
                  <Tab label="Novo" />
                  <Tab label="Atualizar" disabled={valueTab !== 2}/>
                </Tabs>
              </Box>
              <TabPanel value={valueTab} index={2}>
                <Stack spacing={4}>
                  <TextField
                    id="name"
                    label="Nome"
                    variant="standard"
                    error={!!errorsToUpdate.name}
                    helperText={errorsToUpdate.phone && errorsToUpdate.name}
                    onChange={handleChangeToUpdate}
                    value={valuesToUpdate.name}
                  />
                  <TextField
                    id="phone"
                    label="Telefone"
                    variant="standard"
                    error={!!errorsToUpdate.phone}
                    helperText={errorsToUpdate.phone && errorsToUpdate.phone}
                    onChange={handleChangeToUpdate}
                    value={valuesToUpdate.phone}
                  />
                  <Button
                    variant="contained"
                    onClick={handleUpdate}
                    disabled={isLoading}
                  >Atualizar</Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleSetupListValueTab()}
                  >Cancelar</Button>
                </Stack>
              </TabPanel>
              <TabPanel value={valueTab} index={1}>
                <Stack spacing={4}>
                  <TextField
                    id="name"
                    label="Nome"
                    variant="standard"
                    error={!!errors.name}
                    helperText={errors.phone && errors.name}
                    onChange={handleChange}
                    value={values.name}
                  />
                  <TextField
                    id="phone"
                    label="Telefone"
                    variant="standard"
                    error={!!errors.phone}
                    helperText={errors.phone && errors.phone}
                    onChange={handleChange}
                    value={values.phone}
                  />
                  <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={isLoading}
                  >Inserir</Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleSetupListValueTab()}
                  >Cancelar</Button>
                </Stack>
              </TabPanel>
              <TabPanel value={valueTab} index={0}>
                <Stack spacing={4} direction='column'>
                  <Stack spacing={4} direction='row'>
                    <TextField
                      id="search"
                      value={query}
                      onChange={handleOnSearch}
                      label="Buscar"
                      placeholder="Nome, Telefone"
                      variant="standard"
                      onKeyPress={e => e.key === 'Enter' && handleOnSubmitSearch()}
                    />
                    <Button
                      disabled={isLoading || rowsIDSelected.length > 0}
                      variant="contained"
                      onClick={() => handleOnSubmitSearch()}
                    >Buscar</Button>
                    <Button
                      disabled={isLoading || rowsIDSelected.length < 1 || rowsIDSelected.length > 1}
                      variant="contained"
                      onClick={() => handleSetupUpdateValueTab()}
                    >Atualizar</Button>
                    <Button
                      color="error"
                      disabled={rowsIDSelected.length === 0}
                      variant="contained"
                      onClick={() => handleRemoveRows(rowsIDSelected)}
                    >Remover</Button>
                  </Stack>
                  <DataTable
                    rows={rowsFetched.length > 0 ? rowsFetched : rows}
                    rowsIndexSelected={handleRowsSelected}
                  />
                </Stack>
              </TabPanel>
            </Box>
          </PaperCustom>
        </Content>
      </Container>
    </>
  )
}

export default ClientsPage
