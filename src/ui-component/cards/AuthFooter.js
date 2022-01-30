// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="#"  underline="hover">
            Cream11
        </Typography>
        <Typography variant="subtitle2" component={Link} href="#" underline="hover">
            &copy; cream11.com
        </Typography>
    </Stack>
);

export default AuthFooter;
