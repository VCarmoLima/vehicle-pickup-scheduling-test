import { useState, useMemo } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

dayjs.locale('pt-br');

interface Props {
    onNext: (data: string, hora: string) => void;
}

export default function Calendario({ onNext }: Props) {
    const [dataSelecionada, setDataSelecionada] = useState<Dayjs | null>(null);
    const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);
    const [pagina, setPagina] = useState(0);

    const diasDisponiveis = useMemo(() => {
        const days: Dayjs[] = [];
        let current = dayjs();
        while (days.length < 10) {
            if (current.day() !== 0 && current.day() !== 6) {
                days.push(current);
            }
            current = current.add(1, 'day');
        }
        return days;
    }, []);

    const diasPorPagina = 6;
    const diasVisiveis = diasDisponiveis.slice(pagina * diasPorPagina, (pagina + 1) * diasPorPagina);

    const dataFormatada = dataSelecionada ? dataSelecionada.format('YYYY-MM-DD') : '';

    const { data: horariosDisponiveis, isLoading, isError } = useQuery<string[]>({
        queryKey: ['disponibilidade', dataFormatada],
        queryFn: async () => {
            try {
                const response = await api.get(`/disponibilidade?data=${dataFormatada}`);
                const data = response.data;
                if (!data) return [];
                let listaBruta: any[] = [];
                if (data.horarios && Array.isArray(data.horarios)) listaBruta = data.horarios;
                else if (Array.isArray(data)) listaBruta = data;
                else if (typeof data === 'object') listaBruta = Object.values(data);

                return listaBruta
                    .flat()
                    .filter((item) => typeof item === 'string' && item.includes(':'))
                    .map((hora) => hora.substring(0, 5));
            } catch (error) {
                console.error(error);
                return [];
            }
        },
        enabled: !!dataFormatada,
    });

    const mesAtual = dataSelecionada ? dataSelecionada.format('MMMM YYYY') : diasVisiveis[0].format('MMMM YYYY');

    return (
        <Box display="flex" flexDirection="column" alignItems="center" width="100%">

            <Box width="100%" textAlign="left" mb={4}>
                <Typography variant="h6" color="#2c2c2c" fontWeight="bold" gutterBottom>
                    1. Escolha a Data e Horário
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Selecione quando você deseja retirar o veículo.
                </Typography>
            </Box>

            <Typography variant="h6" color="#2c2c2c" fontWeight="bold" sx={{ textTransform: 'capitalize', mb: 3 }}>
                {mesAtual}
            </Typography>
            <Box display="flex" alignItems="center" width="100%" justifyContent="center" mb={4}>
                <IconButton onClick={() => setPagina(p => Math.max(0, p - 1))} disabled={pagina === 0}>
                    <KeyboardArrowLeftIcon />
                </IconButton>

                <Box display="flex" gap={2} mx={2}>
                    {diasVisiveis.map((dia) => {
                        const isSelected = dataSelecionada?.isSame(dia, 'day');
                        return (
                            <Box
                                key={dia.format('YYYY-MM-DD')}
                                onClick={() => {
                                    setDataSelecionada(dia);
                                    setHoraSelecionada(null);
                                }}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    bgcolor: isSelected ? '#e01e3c' : '#f5f5f5',
                                    color: isSelected ? 'white' : '#757575',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': { bgcolor: isSelected ? '#e01e3c' : '#e0e0e0' }
                                }}
                            >
                                <Typography sx={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                    {dia.format('ddd').replace('.', '')}
                                </Typography>
                                <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                                    {dia.format('DD')}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>

                <IconButton
                    onClick={() => setPagina(p => p + 1)}
                    disabled={(pagina + 1) * diasPorPagina >= diasDisponiveis.length}
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box>

            <Box sx={{ width: '100%', minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 1.5 }}>
                {!dataSelecionada && (
                    <Typography color="text.secondary">Selecione uma data acima para ver os horários.</Typography>
                )}
                {isLoading && <CircularProgress size={24} />}
                {isError && <Alert severity="error">Erro ao buscar horários.</Alert>}

                {dataSelecionada && !isLoading && !isError && Array.isArray(horariosDisponiveis) && (
                    horariosDisponiveis.length === 0 ? (
                        <Typography color="text.secondary">Sem horários para este dia.</Typography>
                    ) : (
                        horariosDisponiveis.map((hora) => (
                            <Button
                                key={hora}
                                variant={horaSelecionada === hora ? 'contained' : 'outlined'}
                                onClick={() => setHoraSelecionada(hora)}
                                sx={{
                                    borderRadius: '20px',
                                    px: 3,
                                    bgcolor: horaSelecionada === hora ? '#e01e3c' : 'transparent',
                                    color: horaSelecionada === hora ? 'white' : '#2c2c2c',
                                    borderColor: horaSelecionada === hora ? '#e01e3c' : '#e0e0e0',
                                    '&:hover': {
                                        bgcolor: horaSelecionada === hora ? '#e01e3c' : '#f5f5f5',
                                        borderColor: horaSelecionada === hora ? '#e01e3c' : '#d0d0d0',
                                    }
                                }}
                            >
                                {hora}
                            </Button>
                        ))
                    )
                )}
            </Box>

            <Box mt={6} width="100%" display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    onClick={() => onNext(dataFormatada, horaSelecionada!)}
                    disabled={!horaSelecionada || !dataSelecionada}
                    sx={{
                        bgcolor: '#ff274b',
                        '&:hover': { bgcolor: '#e01e3cff' },
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        px: 6,
                        py: 1.5,
                        borderRadius: 2
                    }}
                >
                    Agendar
                </Button>
            </Box>
        </Box>
    );
}