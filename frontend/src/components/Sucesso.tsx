import { Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Props {
    onReset: () => void;
}

export default function Sucesso({ onReset }: Props) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            py={4}
        >
            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />

            <Typography variant="h5" color="secondary.main" fontWeight="bold" gutterBottom>
                Agendamento Confirmado!
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={4} maxWidth="400px">
                Tudo certo! Seus dados foram registrados e o horário está garantido para a retirada do veículo.
            </Typography>

            <Button
                variant="outlined"
                color="secondary"
                onClick={onReset}
            >
                Fazer Novo Agendamento
            </Button>
        </Box>
    );
}