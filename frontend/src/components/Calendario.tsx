import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Grid } from '@mui/material';

interface Props {
    onNext: () => void;
}

export default function Calendario({ onNext }: Props) {
    const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);
    const mockHorarios = ['09:00', '10:00', '11:00', '14:00', '15:00'];

    return (
        <Box>
            <Typography variant="h6" color="secondary.main" gutterBottom>
                1. Escolha a Data e Horário
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
                Selecione quando você deseja retirar o veículo.
            </Typography>

            <Box mb={4}>
                <TextField
                    type="date"
                    label="Data da Retirada"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </Box>

            <Typography variant="subtitle2" color="secondary.main" gutterBottom>
                Horários Disponíveis:
            </Typography>

            <Grid container spacing={2} mb={4}>
                {mockHorarios.map((hora) => (
                    <Grid size={{ xs: 4, sm: 3 }} key={hora}>
                        <Button
                            variant={horaSelecionada === hora ? 'contained' : 'outlined'}
                            color={horaSelecionada === hora ? 'primary' : 'secondary'}
                            fullWidth
                            sx={{ py: 1.5 }}
                            onClick={() => setHoraSelecionada(hora)}
                        >
                            {hora}
                        </Button>
                    </Grid>
                ))}
            </Grid>

            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onNext}
                    disabled={!horaSelecionada}
                >
                    Avançar para Dados
                </Button>
            </Box>
        </Box>
    );
}