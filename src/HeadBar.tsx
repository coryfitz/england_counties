import { title } from './Config';
import NavButton from './NavButton';
import { AppBar, Box, Container, Link, Toolbar, Typography } from '@mui/material';

function HeadBar() {

    return (
        <Container>
            <Box sx={{ marginTop: 2 }}>
                <AppBar position="static" color="default" elevation={1}>
                    <Toolbar sx={{
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        justifyContent: { xs: 'center', md: 'space-between' },
                    }}>
                        <Link href="/" color="inherit" sx={{
                            flexGrow: { md: 1 },
                            textDecoration: 'none',
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            width: '100%'
                        }}>
                            <Typography variant="h6" sx={{ color: 'black', textAlign: { xs: 'center', md: 'left' }, mb: { xs: 2, md: 0 } }}>
                                {title}
                            </Typography>
                        </Link>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: { xs: '100%', md: 'auto' }
                        }}>
                            <NavButton text='Study' href='study'/>
                            <NavButton text='Quiz' href='quiz'/>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </Container>
    );
}



export default HeadBar;