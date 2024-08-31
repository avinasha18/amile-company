import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Snackbar, Alert, Paper, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { Actions } from '../../hooks/actions';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const [identifier, setIdentifier] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleForgotPassword = async () => {
        if (!identifier ) {
            setSnackbarMessage('Please fill in all fields.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        setLoading(true);

        try {
            const response = await Actions.forgotPassword({ email: identifier.trim() });
            if (response.data.success) {
                setSnackbarMessage('Password reset link sent successfully!');
                setSnackbarSeverity('success');
            } else {
                setSnackbarMessage(response.data.message || 'Failed to send password reset link.');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setSnackbarMessage('An error occurred. Please try again.');
            setSnackbarSeverity('error');
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: isDarkMode ? 'black' : 'white' }}>
            <Paper
                elevation={3}
                sx={{ padding: 4, width: '100%', maxWidth: 400, bgcolor: isDarkMode ? '#fff' : '', color: isDarkMode ? '#000' : '#000' }}
            >
                <Typography variant="h5" gutterBottom align="center">
                    Forgot Password
                </Typography>
                <TextField
                    label="Username or Email ID"
                    fullWidth
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    sx={{ mb: 3 }}
                />
            
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleForgotPassword}
                    disabled={loading}
                    sx={{ position: 'relative' }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} /> : 'Send Password Reset Link'}
                </Button>
                <Typography >I got to know my password ? <Link to="/login" color='blue'>Login</Link> </Typography>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};
