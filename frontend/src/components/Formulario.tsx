import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Grid } from '@mui/material';

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function Formulario({ onNext, onBack }: Props) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const [erros, setErros] = useState({ email: '', telefone: '' });

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
            novosErros.email = 'Insira um e-mail válido (ex: nome@email.com)';
            valido = false;
        }

        const telLimpo = telefone.replace(/\D/g, '');
        if (telLimpo.length < 10) {
            novosErros.telefone = 'Telefone inválido (mínimo de 10 dígitos)';
            valido = false;
        }

        setErros(novosErros);

        if (valido && nome.trim() !== '') {
            onNext();
        }
    };

    return (
        <Box height="100%" display="flex" flexDirection="column">
            <Box flexGrow={1}>
                <Typography variant="h6" color="secondary.main" gutterBottom>
                    2. Seus Dados
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={4}>
                    Preencha os dados abaixo para confirmar a retirada do veículo.
                </Typography>

                <Grid container spacing={3} mb={4}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Nome Completo"
                            variant="outlined"
                            fullWidth
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="E-mail"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={handleEmailChange}
                            error={!!erros.email}
                            helperText={erros.email}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Telefone"
                            type="tel"
                            variant="outlined"
                            fullWidth
                            value={telefone}
                            onChange={handleTelefoneChange}
                            error={!!erros.telefone}
                            helperText={erros.telefone}
                            placeholder="(11) 99999-9999"
                            required
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box display="flex" justifyContent="space-between" mt="auto">
                <Button variant="outlined" color="secondary" size="large" onClick={onBack}>
                    Voltar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={validarEAvancar}
                    disabled={!nome.trim() || !email.trim() || !telefone.trim()}
                >
                    Confirmar Agendamento
                </Button>
            </Box>
        </Box>
    );
}