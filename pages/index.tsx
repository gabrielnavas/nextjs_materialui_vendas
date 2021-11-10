import Head from 'next/head'

import Box from '@mui/material/Box';
import TopBarAuthenticated from '../src/shared/components/TopBarAuthenticated';

const DashboardPage = () => {
  return (
    <>
     <Head>
        <title>Bem vindo(a)</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <TopBarAuthenticated />
      </Box>
    </>
  );
}


export default DashboardPage