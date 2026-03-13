import { useState } from 'react';
import { CssBaseline, Container, Grid, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { api } from './services/api';
import VeiculoSummary from './components/VeiculoSummary';
import Calendario from './components/Calendario';
import Formulario from './components/Formulario';
import Sucesso from './components/Sucesso';
import type { Veiculo } from './types';

export default function App() {
  const [step, setStep] = useState(1);
  const [agendamento, setAgendamento] = useState({ data: '', hora: '' });

  const { data: veiculo, isLoading, isError } = useQuery<Veiculo>({
    queryKey: ['veiculo', 1],
    queryFn: async () => {
      const response = await api.get('/veiculo/1');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !veiculo) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default" p={2}>
        <Alert severity="error">Erro ao carregar os dados do veículo. Verifique se o backend está rodando!</Alert>
      </Box>
    );
  }

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
              <VeiculoSummary veiculo={veiculo} />
            </Grid>

            <Grid size={{ xs: 12, md: 7, lg: 8 }}>
              <Paper elevation={0} sx={{ p: 4, border: '1px solid #e0e0e0', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease-in-out' }}>
                {step === 1 && (
                  <Calendario
                    onNext={(data, hora) => {
                      setAgendamento({ data, hora });
                      setStep(2);
                    }}
                  />
                )}
                {step === 2 && (
                  <Formulario
                    veiculoId={veiculo.id}
                    agendamento={agendamento}
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