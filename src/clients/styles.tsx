import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import { styled } from '@mui/system'

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100vh'
}))

export const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
  paddingTop: '10px'
}))

export const PaperCustom = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4, 8),
  minWidth: 900
}))

export const DataGridDiv = styled('div')(({ theme }) => ({
  height: 500,
  width: '100%'
}))
