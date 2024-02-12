import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HeadBar from './HeadBar';

function Home() {
    return (
        <Container>
            <HeadBar />
            <Container style={{ marginTop: 10, textAlign: 'center' }}>
                <Typography variant="h5">
                    Select study or quiz mode
                </Typography>
            </Container>
        </Container>
    );
}

export default Home;