import { Card, CardMedia, CardContent, Typography, Box, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { Veiculo } from '../types';

interface Props {
    veiculo: Veiculo;
}

export default function VehicleSummary({ veiculo }: Props) {
    return (
        <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease-in-out' }}>
            <CardMedia
                component="img"
                height="220"
                image={veiculo.imagem_url}
                alt={veiculo.modelo}
                sx={{ objectFit: 'contain', bgcolor: '#ffffff', p: 2 }}
            />
            <CardContent>
                <Typography variant="h5" fontWeight="bold" color="secondary.main" gutterBottom>
                    {veiculo.modelo}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {veiculo.versao}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box mt="auto">

                    <Typography variant="h6" color="primary.main" fontWeight="bold" gutterBottom>
                        R$ {Number(veiculo.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Typography>

                    <Box display="flex" alignItems="center" color="text.secondary" mt={2}>
                        <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2">{veiculo.localizacao}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}