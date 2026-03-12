import { useState } from 'react';
import { CssBaseline, Container, Grid, Paper, Typography, Box } from '@mui/material';
import VeiculoSummary from './components/VeiculoSummary';
import Calendario from './components/Calendario';
import Formulario from './components/Formulario';
import Sucesso from './components/Sucesso';
import type { Veiculo } from './types';

// Dados temporários apenas para desenhar a tela
const mockVeiculo: Veiculo = {
  id: 1,
  modelo: 'Fiat Argo',
  versao: 'REX FULL 8V ELÉTRICO 4P AUTOMÁTICO',
  preco: '13700.00',
  imagem_url: 'https://placehold.co/600x400/eeeeee/31343c/png?text=Fiat+Argo',
  localizacao: 'Mogi das Cruzes - SP'
};

export default function App() {
  const [step, setStep] = useState(1);

  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="lg">

          <Typography variant="h4" component="h1" color="secondary.main" fontWeight="bold" mb={4}>
            Agendamento de Retirada
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 5, lg: 4 }}>
              <VeiculoSummary veiculo={mockVeiculo} />
            </Grid>

            <Grid size={{ xs: 12, md: 7, lg: 8 }}>
              <Paper elevation={0} sx={{ p: 4, border: '1px solid #e0e0e0', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease-in-out' }}>
                {step === 1 && (
                  <Calendario onNext={() => setStep(2)} />
                )}
                {step === 2 && (
                  <Formulario
                    onNext={() => setStep(3)}
                    onBack={() => setStep(1)}
                  />
                )}

                {step === 3 && (
                  <Sucesso onReset={() => setStep(1)} />
                )}

              </Paper>
            </Grid>
          </Grid>

        </Container>
      </Box>
    </>
  );
}