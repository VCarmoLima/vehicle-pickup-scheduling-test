import { Box, Typography, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import dayjs from 'dayjs';

interface Props {
    onReset: () => void;
    agendamento: { data: string; hora: string };
    localizacao: string;
}

export default function Sucesso({ onReset, agendamento, localizacao }: Props) {
    const dataFormatada = dayjs(agendamento.data).format('dddd, DD/MM/YYYY');

    return (
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" width="100%">

            <Box
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#ffb3c1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3
                }}
            >
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        bgcolor: '#ff274b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CheckIcon sx={{ color: 'white', fontSize: 32 }} />
                </Box>
            </Box>

            <Typography variant="h5" color="#2c2c2c" fontWeight="bold" gutterBottom>
                Agendamento concluído!
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                    color: '#4a4a4a',
                    mb: 5,
                    mt: 2,
                }}
            >
                <Box display="flex" alignItems="center" gap={0.5}>
                    <CalendarTodayOutlinedIcon fontSize="small" />
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {dataFormatada} às {agendamento.hora}
                    </Typography>
                </Box>

                <Typography variant="body2" sx={{ mx: 1, display: { xs: 'none', sm: 'block' } }}>
                    |
                </Typography>

                <Box display="flex" alignItems="center" gap={0.5}>
                    <LocationOnOutlinedIcon fontSize="small" />
                    <Typography variant="body2">
                        {localizacao}
                    </Typography>
                </Box>
            </Box>

            <Button
                variant="contained"
                disableElevation
                sx={{
                    bgcolor: '#ff274b',
                    '&:hover': { bgcolor: '#e01e3c' },
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2
                }}
                onClick={onReset}
            >
                Novo Agendamento
            </Button>
        </Box>
    );
}