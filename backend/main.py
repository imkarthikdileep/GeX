from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import GEOparse
import plotly.express as px
from pydantic import BaseModel
from typing import List, Optional
import json

app = FastAPI(title="Gene Expression Explorer API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cache for storing downloaded datasets
dataset_cache = {}

class GeneQuery(BaseModel):
    gene_id: str
    dataset_id: str

class DatasetInfo(BaseModel):
    dataset_id: str
    title: str
    organism: str
    sample_count: int

@app.get("/")
async def root():
    return {"message": "Welcome to Gene Expression Explorer API"}

@app.get("/datasets/search/{query}")
async def search_datasets(query: str):
    try:
        # Search GEO for datasets
        # Note: In a real implementation, you would want to cache this
        datasets = []
        # Mock data for demonstration
        datasets = [
            {"id": "GSE123456", "title": "Breast Cancer Study", "organism": "Homo sapiens", "samples": 50},
            {"id": "GSE789012", "title": "Lung Cancer Analysis", "organism": "Homo sapiens", "samples": 40}
        ]
        return datasets
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/dataset/{dataset_id}")
async def get_dataset(dataset_id: str):
    try:
        if dataset_id not in dataset_cache:
            # Download and parse dataset
            gse = GEOparse.get_GEO(geo=dataset_id, destdir="./data")
            dataset_cache[dataset_id] = gse
        
        gse = dataset_cache[dataset_id]
        
        # Process and return dataset information
        data = {
            "title": gse.metadata["title"][0],
            "summary": gse.metadata["summary"][0],
            "samples": len(gse.gsms),
            "platform": gse.metadata["platform_id"][0]
        }
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/expression")
async def analyze_expression(query: GeneQuery):
    try:
        # Mock data for demonstration
        expression_data = {
            "healthy": np.random.normal(10, 2, 20).tolist(),
            "diseased": np.random.normal(15, 3, 20).tolist()
        }
        
        # Calculate statistics
        stats = {
            "healthy_mean": np.mean(expression_data["healthy"]),
            "diseased_mean": np.mean(expression_data["diseased"]),
            "fold_change": np.mean(expression_data["diseased"]) / np.mean(expression_data["healthy"])
        }
        
        return {
            "expression_data": expression_data,
            "statistics": stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/health")
async def predict_health(query: GeneQuery):
    try:
        # Mock ML prediction
        # In a real implementation, you would load a trained model
        prediction = {
            "prediction": "healthy" if np.random.random() > 0.5 else "diseased",
            "confidence": round(np.random.random() * 100, 2)
        }
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/visualization/{dataset_id}/{gene_id}")
async def get_visualization(dataset_id: str, gene_id: str):
    try:
        # Generate mock visualization data
        data = {
            "type": "boxplot",
            "data": {
                "healthy": np.random.normal(10, 2, 20).tolist(),
                "diseased": np.random.normal(15, 3, 20).tolist()
            }
        }
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 