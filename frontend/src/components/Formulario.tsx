import { Box, Typography, TextField, Button } from '@mui/material';
import { Grid } from '@mui/material';

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function Formulario({ onNext, onBack }: Props) {
    return (
        <Box>
            <Typography variant="h6" color="secondary.main" gutterBottom>
                2. Seus Dados
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
                Preencha os dados abaixo para confirmar a retirada do veículo.
            </Typography>

            <Grid container spacing={3} mb={4}>
                <Grid size={{ xs: 12 }}>
                    <TextField label="Nome Completo" variant="outlined" fullWidth required />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="E-mail" type="email" variant="outlined" fullWidth required />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Telefone" type="tel" variant="outlined" fullWidth required />
                </Grid>
            </Grid>

            <Box display="flex" justifyContent="space-between" mt={4}>
                <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={onBack}
                >
                    Voltar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onNext}
                >
                    Confirmar Agendamento
                </Button>
            </Box>
        </Box>
    );
}