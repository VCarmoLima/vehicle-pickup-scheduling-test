import { CssBaseline, Container, Grid, Paper, Typography, Box } from '@mui/material';
import VehicleSummary from './components/VehicleSummary';
import type { Vehicle } from './types';

// Dados temporários apenas para desenhar a tela
const mockVehicle: Vehicle = {
  id: 1,
  modelo: 'Fiat Argo',
  versao: 'REX FULL 8V ELÉTRICO 4P AUTOMÁTICO',
  preco: '13700.00',
  imagem_url: 'https://placehold.co/600x400/eeeeee/31343c/png?text=Fiat+Argo',
  localizacao: 'Mogi das Cruzes - SP'
};

export default function App() {
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
              <VehicleSummary vehicle={mockVehicle} />
            </Grid>

            <Grid size={{ xs: 12, md: 7, lg: 8 }}>
              <Paper elevation={0} sx={{ p: 4, border: '1px solid #e0e0e0', borderRadius: 2, minHeight: '400px' }}>
                <Typography variant="h6" color="secondary.main" gutterBottom>
                  Área de Ações
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  (Aqui construiremos o calendário de {mockVehicle.modelo} e o formulário na próxima etapa!)
                </Typography>
              </Paper>
            </Grid>
          </Grid>

        </Container>
      </Box>
    </>
  );
}