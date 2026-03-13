import { Card, CardMedia, CardContent, Typography, Box, Divider } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import type { Veiculo } from '../types';

interface Props {
    veiculo: Veiculo;
}

export default function VeiculoSummary({ veiculo }: Props) {
    return (
        <Card
            elevation={0}
            sx={{
                border: '1px solid #eaeaea',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                height: '100%'
            }}
        >
            <CardMedia
                component="img"
                height="240"
                image={veiculo.imagem_url || 'https://placehold.co/400x300'}
                alt={veiculo.modelo}
                sx={{ objectFit: 'contain', bgcolor: '#ffffff', p: 2 }}
            />

            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography variant="h5" component="h2" fontWeight="bold" color="#2c2c2c" gutterBottom>
                    {veiculo.modelo}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {veiculo.versao}
                </Typography>

                <Typography variant="h6" color="#2c2c2c" fontWeight="bold" mt={1} mb={2}>
                    R$ {Number(veiculo.preco).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </Typography>

                <Box mt="auto">
                    <Divider sx={{ my: 2, borderColor: '#eaeaea' }} />
                    <Box display="flex" alignItems="center">
                        <LocationOnOutlinedIcon fontSize="small" sx={{ mr: 1, color: '#2c2c2c' }} />
                        <Typography variant="body2" color="#2c2c2c">
                            {veiculo.localizacao}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}