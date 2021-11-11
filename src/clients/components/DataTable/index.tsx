import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Row } from '../../hooks/useGetAllClientHook'

import {
  DataGridDiv
} from '../../styles'

type Props = {
  rows: Row[]
  rowsIndexSelected(allRowsIndex: number[]): void
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Nome', width: 180 },
  { field: 'phone', headerName: 'Telefone', width: 150 }
]

const DataTable = ({ rows, rowsIndexSelected }: Props) =>
  <DataGridDiv>
    <DataGrid
      onSelectionModelChange={rowsIndexSelected}
      rows={rows}
      columns={columns}
      pageSize={22}
      rowsPerPageOptions={[10]}
      checkboxSelection
      localeText={{
        footerRowSelected: (count) =>
          count !== 1
            ? `${count.toLocaleString()} linhas selecionadas`
            : `${count.toLocaleString()} linha selcionada`,
        noRowsLabel: 'Nenhum dado encontrado'
      }}
    />
  </DataGridDiv>

export default DataTable
