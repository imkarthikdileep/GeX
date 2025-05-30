import React from 'react';
import Plot from 'react-plotly.js';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';

interface ExpressionData {
  healthy: number[];
  diseased: number[];
}

interface Statistics {
  healthy_mean: number;
  diseased_mean: number;
  fold_change: number;
}

interface GeneExpressionVisualizationProps {
  data?: {
    expression_data: ExpressionData;
    statistics: Statistics;
  };
  loading: boolean;
  error?: string;
}

const GeneExpressionVisualization: React.FC<GeneExpressionVisualizationProps> = ({
  data,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!data) {
    return null;
  }

  const { expression_data, statistics } = data;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
      }}
    >
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Expression Analysis
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Healthy Mean: {statistics.healthy_mean.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Diseased Mean: {statistics.diseased_mean.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fold Change: {statistics.fold_change.toFixed(2)}x
        </Typography>
      </Box>

      <Plot
        data={[
          {
            type: 'box',
            y: expression_data.healthy,
            name: 'Healthy',
            boxpoints: 'all',
            jitter: 0.3,
            pointpos: -1.8,
            marker: { color: '#2196f3' },
          },
          {
            type: 'box',
            y: expression_data.diseased,
            name: 'Diseased',
            boxpoints: 'all',
            jitter: 0.3,
            pointpos: -1.8,
            marker: { color: '#f44336' },
          },
        ]}
        layout={{
          title: 'Gene Expression Distribution',
          yaxis: { title: 'Expression Level' },
          boxmode: 'group',
          height: 500,
          width: undefined,
          autosize: true,
          margin: { l: 50, r: 50, t: 50, b: 50 },
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
      />
    </Paper>
  );
};

export default GeneExpressionVisualization; 