# Gene Expression Explorer

A web application for analyzing and visualizing gene expression data from NCBI's GEO repository. Built for researchers to explore and analyze biomedical data.

## Features

- Search and filter through gene expression datasets
- Interactive data visualization
- Machine learning-based gene health prediction
- User-friendly interface for researchers
- Integration with NCBI's GEO repository

## Tech Stack

- Frontend: React.js with modern UI components
- Backend: Python with FastAPI
- Data Processing: Pandas, SciPy, NumPy
- Machine Learning: scikit-learn
- Visualization: Plotly

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
 venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
uvicorn main:app --reload
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Project Structure
```
.
├── frontend/           # React frontend application
├── backend/           # Python backend API
└── README.md         # Project documentation
``` 
