import json
import pickle
import numpy as np
from sklearn.cluster import KMeans

# 1. Settings
DATA_FILE = "jsonDatabase.json"
MODEL_FILE = "tutor_model.pkl"

def train():

    with open(DATA_FILE, 'r') as f:
        tutors = json.load(f)

    vectors = [t['scores'] for t in tutors]

    kmeans = KMeans(n_clusters=3, random_state=42)
    kmeans.fit(vectors)

    with open(MODEL_FILE, 'wb') as f:
        pickle.dump(kmeans, f)
        
    print(f"Completed: Cluster Centers found:\n{kmeans.cluster_centers_}")

if __name__ == "__main__":
    train()