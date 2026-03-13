import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { api } from '../services/api';

interface Props {
    veiculoId: number;
    agendamento: { data: string; hora: string };
    onNext: () => void;
    onBack: () => void;
}

export default function Formulario({ veiculoId, agendamento, onNext }: Props) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [erros, setErros] = useState({ email: '', telefone: '' });

    const mutation = useMutation({
        mutationFn: async () => {
            const dataHoraMySQL = `${agendamento.data} ${agendamento.hora}:00`;

            const payload = {
                veiculo_id: veiculoId,
                nome,
                email,
                telefone: telefone.replace(/\D/g, ''),
                data_hora: dataHoraMySQL,
            };

            return await api.post('/agendamentos', payload);
        },
        onSuccess: () => {
            onNext();
        },
    });

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
        let formatted = raw;

        if (raw.length > 2) {
            formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
        }
        if (raw.length > 6) {
            if (raw.length === 11) {
                formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
            } else {
                formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
            }
        }
        setTelefone(formatted);
        if (erros.telefone) setErros({ ...erros, telefone: '' });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (erros.email) setErros({ ...erros, email: '' });
    };

    const validarEAvancar = () => {
        let valido = true;
        const novosErros = { email: '', telefone: '' };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            novosErros.email = 'Insira um e-mail válido';
            valido = false;
        }

        const telLimpo = telefone.replace(/\D/g, '');
        if (telLimpo.length < 10) {
            novosErros.telefone = 'Telefone inválido (mínimo de 10 dígitos)';
            valido = false;
        }

        setErros(novosErros);

        if (valido && nome.trim() !== '') {
            mutation.mutate();
        }
    };

    return (
        <Box height="100%" display="flex" flexDirection="column" alignItems="center">
            <Box width="100%" flexGrow={1} display="flex" flexDirection="column" alignItems="center">

                <Box width="100%" textAlign="left" mb={4}>
                    <Typography variant="h6" color="#2c2c2c" fontWeight="bold" gutterBottom>
                        2. Seus Dados
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Preencha os dados abaixo para confirmar a retirada do veículo na data e hora selecionada:
                    </Typography>
                </Box>

                <Typography variant="subtitle1" color="#2c2c2c" fontWeight="bold" sx={{ textTransform: 'capitalize', mb: 4 }}>
                    {dayjs(agendamento.data).format('dddd, DD/MM/YYYY')}, às {agendamento.hora}
                </Typography>

                {mutation.isError && (
                    <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
                        Ops! Ocorreu um erro ao agendar. Tente novamente.
                    </Alert>
                )}

                <Grid container spacing={3} mb={4} sx={{ width: '100%' }}>
                    <Grid size={{ xs: 12 }}>
                        <TextField label="Nome" variant="outlined" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} disabled={mutation.isPending} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="E-mail" type="email" variant="outlined" fullWidth value={email} onChange={handleEmailChange} error={!!erros.email} helperText={erros.email} disabled={mutation.isPending} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Telefone" type="tel" variant="outlined" fullWidth value={telefone} onChange={handleTelefoneChange} error={!!erros.telefone} helperText={erros.telefone} placeholder="(11) 99999-9999" disabled={mutation.isPending} />
                    </Grid>
                </Grid>
            </Box>

            <Box display="flex" justifyContent="center" mt="auto" width="100%">
                <Button
                    variant="contained"
                    onClick={validarEAvancar}
                    disabled={!nome.trim() || !email.trim() || !telefone.trim() || mutation.isPending}
                    sx={{
                        bgcolor: '#ff274b',
                        '&:hover': { bgcolor: '#e01e3c' },
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        px: 8,
                        py: 1.5,
                        borderRadius: 2
                    }}
                >
                    {mutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Concluir'}
                </Button>
            </Box>
        </Box>
    );
}