import { styled } from '@mui/system';
import Head from 'next/head'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import TopBarNotAuthenticated from '../src/shared/components/TopBarNotAuthenticated';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100vh',
}));

const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%',
}));

const PaperCustom = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8, 12)
}));

const LoginPage = () =>{

  return (
    <>
     <Head>
        <title>Bem vindo(a)</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <TopBarNotAuthenticated />
        <Content>
          <PaperCustom elevation={3} >
          <Stack spacing={3} direction="column">
            <Typography variant="h4" gutterBottom component="div">
              Entrar
            </Typography>
            <TextField
              required
              id="username"
              label="Nome de usuário"
              defaultValue=""
              variant="standard"
              placeholder="Josesilva"
              focused
            />
            <TextField
              required
              type="password"
              id="username"
              label="Senha"
              defaultValue=""
              variant="standard"
              placeholder="123456"
            />
            <Button variant="contained">Entrar</Button>
          </Stack>
          </PaperCustom>
        </Content>
      </Container>
    </>
  );
}


export default LoginPage