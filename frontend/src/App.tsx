import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
} from '@mui/material';
import SearchBar from './components/SearchBar';
import DatasetList from './components/DatasetList';
import GeneExpressionVisualization from './components/GeneExpressionVisualization';
import HealthPrediction from './components/HealthPrediction';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const API_BASE_URL = 'http://localhost:8000';

function App() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [expressionData, setExpressionData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState({
    datasets: false,
    expression: false,
    prediction: false,
  });
  const [error, setError] = useState({
    datasets: '',
    expression: '',
    prediction: '',
  });

  const searchDatasets = async (query: string) => {
    setLoading((prev) => ({ ...prev, datasets: true }));
    setError((prev) => ({ ...prev, datasets: '' }));
    try {
      const response = await axios.get(`${API_BASE_URL}/datasets/search/${query}`);
      setDatasets(response.data);
    } catch (err) {
      setError((prev) => ({
        ...prev,
        datasets: 'Failed to fetch datasets. Please try again.',
      }));
    } finally {
      setLoading((prev) => ({ ...prev, datasets: false }));
    }
  };

  const analyzeGene = async (geneId: string) => {
    if (!selectedDataset) return;

    setLoading((prev) => ({
      ...prev,
      expression: true,
      prediction: true,
    }));
    setError((prev) => ({
      ...prev,
      expression: '',
      prediction: '',
    }));

    try {
      const [expressionResponse, predictionResponse] = await Promise.all([
        axios.post(`${API_BASE_URL}/analyze/expression`, {
          gene_id: geneId,
          dataset_id: selectedDataset.id,
        }),
        axios.post(`${API_BASE_URL}/predict/health`, {
          gene_id: geneId,
          dataset_id: selectedDataset.id,
        }),
      ]);

      setExpressionData(expressionResponse.data);
      setPrediction(predictionResponse.data);
    } catch (err) {
      setError((prev) => ({
        ...prev,
        expression: 'Failed to analyze gene expression.',
        prediction: 'Failed to predict gene health status.',
      }));
    } finally {
      setLoading((prev) => ({
        ...prev,
        expression: false,
        prediction: false,
      }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(120deg, #1a237e 0%, #0d47a1 100%)',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ color: 'white', mb: 4 }}
          >
            Gene Expression Explorer
          </Typography>

          <SearchBar
            onSearch={searchDatasets}
            placeholder="Search for datasets (e.g., GSE123456, cancer, etc.)"
          />

          {datasets.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <DatasetList
                datasets={datasets}
                onSelect={(dataset) => setSelectedDataset(dataset)}
              />
            </Box>
          )}

          {selectedDataset && (
            <Box sx={{ mt: 4 }}>
              <Paper
                sx={{
                  p: 3,
                  mb: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Selected Dataset: {selectedDataset.title}
                </Typography>
                <SearchBar
                  onSearch={analyzeGene}
                  placeholder="Enter gene ID to analyze"
                />
              </Paper>

              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <GeneExpressionVisualization
                    data={expressionData}
                    loading={loading.expression}
                    error={error.expression}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <HealthPrediction
                    prediction={prediction}
                    loading={loading.prediction}
                    error={error.prediction}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 