import {Button} from '@mui/material';

function NavButton ({text, href, onClick}: any) {
    return (
        <Button 
            color="inherit" 
            variant="contained" 
            href={href}
            onClick={onClick}
            sx={{
                mr: { xs: 1, md: 2 },
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                    bgcolor: 'primary.dark',
                    color: 'white',
                },
            }}
        >
            {text}
        </Button>
    );
}

export default NavButton;