import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

interface Dataset {
  id: string;
  title: string;
  organism: string;
  samples: number;
}

interface DatasetListProps {
  datasets: Dataset[];
  onSelect: (dataset: Dataset) => void;
}

const DatasetList: React.FC<DatasetListProps> = ({ datasets, onSelect }) => {
  return (
    <Grid container spacing={3}>
      {datasets.map((dataset) => (
        <Grid item xs={12} md={6} key={dataset.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {dataset.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dataset ID: {dataset.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Organism: {dataset.organism}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Number of Samples: {dataset.samples}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<BarChartIcon />}
                  onClick={() => onSelect(dataset)}
                  fullWidth
                >
                  Analyze Dataset
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DatasetList; 