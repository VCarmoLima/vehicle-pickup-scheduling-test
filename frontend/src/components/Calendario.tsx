import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

interface Props {
    onNext: () => void;
}

export default function Calendario({ onNext }: Props) {
    const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);
    const [dataRetirada, setDataRetirada] = useState<Dayjs | null>(null);

    const mockHorarios = ['09:00', '10:00', '11:00', '14:00', '15:00'];

    return (
        <Box height="100%" display="flex" flexDirection="column">
            <Box flexGrow={1}>
                <Typography variant="h6" color="secondary.main" gutterBottom>
                    1. Escolha a Data e Horário
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={4}>
                    Selecione quando você deseja retirar o veículo.
                </Typography>

                <Box mb={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <DatePicker
                            label="Data da Retirada"
                            value={dataRetirada}
                            onChange={(newValue) => setDataRetirada(newValue)}
                            format="DD/MM/YYYY"
                            disablePast
                            maxDate={dayjs().add(30, 'day')}
                            shouldDisableDate={(date) => date.day() === 0 || date.day() === 6}
                            sx={{ width: '100%' }}
                        />
                    </LocalizationProvider>
                </Box>

                <Typography variant="subtitle2" color="secondary.main" gutterBottom>
                    Horários Disponíveis:
                </Typography>

                <Grid container spacing={2} mb={4}>
                    {mockHorarios.map((hora) => (
                        <Grid size={{ xs: 4, sm: 3 }} key={hora}>
                            <Button
                                variant={horaSelecionada === hora ? 'contained' : 'outlined'}
                                color="primary"
                                fullWidth
                                sx={{ py: 1.5 }}
                                onClick={() => setHoraSelecionada(hora)}
                            >
                                {hora}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box display="flex" justifyContent="flex-end" mt="auto">
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onNext}
                    disabled={!horaSelecionada || !dataRetirada}
                >
                    Avançar para Dados
                </Button>
            </Box>
        </Box>
    );
}