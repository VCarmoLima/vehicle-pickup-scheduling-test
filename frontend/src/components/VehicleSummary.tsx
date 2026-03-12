import { Card, CardMedia, CardContent, Typography, Box, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { Vehicle } from '../types';

interface Props {
    vehicle: Vehicle;
}

export default function VehicleSummary({ vehicle }: Props) {
    return (
        <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <CardMedia
                component="img"
                height="220"
                image={vehicle.imagem_url}
                alt={vehicle.modelo}
                sx={{ objectFit: 'contain', bgcolor: '#ffffff', p: 2 }}
            />
            <CardContent>
                <Typography variant="h5" fontWeight="bold" color="secondary.main" gutterBottom>
                    {vehicle.modelo}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {vehicle.versao}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" color="primary.main" fontWeight="bold" gutterBottom>
                    R$ {Number(vehicle.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>

                <Box display="flex" alignItems="center" color="text.secondary" mt={2}>
                    <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{vehicle.localizacao}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}