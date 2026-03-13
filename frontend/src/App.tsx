import { useState } from 'react';
import { CssBaseline, Container, Paper, Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useQuery } from '@tanstack/react-query';
import { api } from './services/api';
import Menu from './components/Menu';
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

  const getWizardTitle = () => {
    if (step === 1) return "Agende o dia e horário da sua visita";
    if (step === 2) return "Concluir Agendamento";
    return "";
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#fafafa">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !veiculo) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#fafafa" p={2}>
        <Alert severity="error">Erro ao carregar os dados do veículo.</Alert>
      </Box>
    );
  }

  return (
    <>
      <CssBaseline />

      <Menu />

      <Box sx={{ bgcolor: '#fafafa', minHeight: 'calc(100vh - 80px)', py: 4 }}>
        <Container maxWidth="lg">

          {step < 3 && (
            <Button
              startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '14px !important' }} />}
              sx={{ color: '#2c2c2c', textTransform: 'none', mb: 3, fontWeight: 600, fontSize: '16px' }}
              onClick={() => {
                if (step === 2) {
                  setStep(1)
                }
              }}
            >
              Voltar
            </Button>
          )}

          <Grid container spacing={4}>
            {step < 3 && (
              <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                <VeiculoSummary veiculo={veiculo} />
              </Grid>
            )}

            <Grid size={{ xs: 12, md: step === 3 ? 12 : 7, lg: step === 3 ? 12 : 8 }}>

              {step < 3 ? (
                <Paper
                  elevation={0}
                  sx={{
                    border: '1px solid #eaeaea',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    height: '100%',
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  <Box sx={{ bgcolor: '#2c3038', color: 'white', py: 2.5, textAlign: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="500">
                      {getWizardTitle()}
                    </Typography>
                  </Box>

                  <Box sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
                  </Box>
                </Paper>
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    border: '1px solid #eaeaea',
                    borderRadius: 2,
                    bgcolor: '#ffffffff',
                    p: { xs: 4, md: 8 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '400px'
                  }}
                >
                  <Sucesso
                    onReset={() => setStep(1)}
                    agendamento={agendamento}
                    localizacao={veiculo.localizacao}
                  />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}