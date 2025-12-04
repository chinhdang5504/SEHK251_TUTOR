import json
import pickle
import numpy as np
import os
from sklearn.metrics.pairwise import euclidean_distances

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "jsonDatabase.json")
MODEL_FILE = os.path.join(BASE_DIR, "tutor_model.pkl")

class TutorMatcher:
    def __init__(self):
        if not os.path.exists(DATA_FILE):
            raise FileNotFoundError(f"Missing data file: {DATA_FILE}")
        with open(DATA_FILE, 'r') as f:
            self.tutors = json.load(f)

        if not os.path.exists(MODEL_FILE):
            raise FileNotFoundError(f"Missing model file: {MODEL_FILE}")
        with open(MODEL_FILE, 'rb') as f:
            self.model = pickle.load(f)
            
        self.tutors_by_cluster = {}
        tutor_labels = self.model.labels_

        for i, tutor in enumerate(self.tutors):
            cluster_id = tutor_labels[i]
            
            if cluster_id not in self.tutors_by_cluster:
                self.tutors_by_cluster[cluster_id] = []
            
            self.tutors_by_cluster[cluster_id].append(tutor)
    
    def find_matches(self, student_vector, top_k=3): 

        student_vec_np = np.array([student_vector])
        predicted_cluster = self.model.predict(student_vec_np)[0]
        candidates = self.tutors_by_cluster.get(predicted_cluster, [])
        
        if not candidates:
            return []

        candidate_vectors = [t['scores'] for t in candidates]
        dists = euclidean_distances(student_vec_np, candidate_vectors)[0]
        
        results = []
        for i, dist in enumerate(dists):
            results.append({
                "tutor": candidates[i],
                "score": 100 - (dist * 10),
                "raw_distance": dist
            })

        results.sort(key=lambda x: x['raw_distance'])        
        return results[:top_k]

if __name__ == "__main__":
    matcher = TutorMatcher()
    test_student = [5, 5, 5, 5, 5]
    matches = matcher.find_matches(test_student)
    
    print("\n--- Best Matches ---")
    for m in matches:
        print(f"ID: {m['tutor']['id']} | Cluster: {matcher.model.predict([m['tutor']['scores']])[0]} | Dist: {m['raw_distance']:.4f}")