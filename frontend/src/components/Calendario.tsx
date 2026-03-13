import { useState } from 'react';
import { Box, Typography, Grid, Button, CircularProgress, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

dayjs.locale('pt-br');

interface Props {
    onNext: (data: string, hora: string) => void;
}

export default function Calendario({ onNext }: Props) {
    const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);
    const [dataRetirada, setDataRetirada] = useState<Dayjs | null>(null);

    const dataFormatada = dataRetirada ? dataRetirada.format('YYYY-MM-DD') : '';

    const { data: horariosDisponiveis, isLoading, isError } = useQuery<string[]>({
        queryKey: ['disponibilidade', dataFormatada],
        queryFn: async () => {
            try {
                const response = await api.get(`/disponibilidade?data=${dataFormatada}`);
                const data = response.data;

                if (!data) return [];

                let listaBruta: any[] = [];

                if (data.horarios && Array.isArray(data.horarios)) {
                    listaBruta = data.horarios;
                }
                else if (Array.isArray(data)) {
                    listaBruta = data;
                }
                else if (typeof data === 'object') {
                    listaBruta = Object.values(data);
                }
                const apenasHorarios = listaBruta
                    .flat()
                    .filter((item) => typeof item === 'string' && item.includes(':'))
                    .map((hora) => hora.substring(0, 5));

                return apenasHorarios;

            } catch (error) {
                console.error("Erro na API de disponibilidade:", error);
                return [];
            }
        },
        enabled: !!dataFormatada,
    });

    const handleDateChange = (newValue: Dayjs | null) => {
        setDataRetirada(newValue);
        setHoraSelecionada(null);
    };

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
                            onChange={handleDateChange}
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

                {isLoading && <CircularProgress size={24} sx={{ my: 2 }} />}
                {isError && <Alert severity="error">Erro ao buscar horários.</Alert>}

                {horariosDisponiveis && horariosDisponiveis.length === 0 && (
                    <Alert severity="warning">Não há horários disponíveis para esta data.</Alert>
                )}

                <Grid container spacing={2} mb={4}>
                    {Array.isArray(horariosDisponiveis) && horariosDisponiveis.map((hora) => (
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
                    onClick={() => onNext(dataFormatada, horaSelecionada!)}
                    disabled={!horaSelecionada || !dataRetirada}
                >
                    Avançar para Dados
                </Button>
            </Box>
        </Box>
    );
}