import React from "react";
import { title } from './Config';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

function HeadBar() {
    return (
        <Container>
            <Box sx={{ marginTop: 2 }}>
                <AppBar position="static" color="default" elevation={1}>
                    <Toolbar>
                        <Link href="/" color="inherit" style={{ flexGrow: 1, textDecoration: 'none' }}>
                            <Typography variant="h6" style={{ color: 'black', marginLeft: 15 }}>
                                {title}
                            </Typography>
                        </Link>
                        <Button color="inherit" variant="contained" href="study" style={{ margin: 5, backgroundColor: '#4CAF50' }}>
                            Study
                        </Button>
                        <Button color="inherit" variant="contained" href="quiz" style={{ margin: 5, backgroundColor: '#4CAF50' }}>
                            Quiz
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Container>
    );
}

export default HeadBar;