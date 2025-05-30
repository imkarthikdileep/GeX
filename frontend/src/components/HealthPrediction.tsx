import React from 'react';
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

interface HealthPredictionProps {
  prediction?: {
    prediction: 'healthy' | 'diseased';
    confidence: number;
  };
  loading: boolean;
  error?: string;
}

const HealthPrediction: React.FC<HealthPredictionProps> = ({
  prediction,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
        }}
      >
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Paper>
    );
  }

  if (!prediction) {
    return null;
  }

  const { prediction: healthStatus, confidence } = prediction;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Health Status Prediction
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={2}
        color={healthStatus === 'healthy' ? 'success.main' : 'error.main'}
      >
        {healthStatus === 'healthy' ? (
          <CheckCircleIcon fontSize="large" />
        ) : (
          <WarningIcon fontSize="large" />
        )}
        <Typography variant="h5" component="span">
          {healthStatus.charAt(0).toUpperCase() + healthStatus.slice(1)}
        </Typography>
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Confidence: {confidence}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={confidence}
          color={healthStatus === 'healthy' ? 'success' : 'error'}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>
    </Paper>
  );
};

export default HealthPrediction; 