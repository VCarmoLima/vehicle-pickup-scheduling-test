import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

export default function Menu() {

    return (
        <>
            <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #eaeaea' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 80 }}>

                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            <span style={{ color: '#2c2c2c' }}>Logo</span>
                        </Typography>

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                            <Button sx={{ color: '#2c2c2c', textTransform: 'none', fontSize: '16px', fontWeight: 500 }}>
                                Vender
                            </Button>
                            <Button sx={{ color: '#2c2c2c', textTransform: 'none', fontSize: '16px', fontWeight: 500 }}>
                                Comprar
                            </Button>
                            <Button sx={{ color: '#2c2c2c', textTransform: 'none', fontSize: '16px', fontWeight: 500 }}>
                                Lojas
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}