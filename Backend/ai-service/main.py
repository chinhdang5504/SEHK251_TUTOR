import json
import os
import psycopg2 # <--- Library to talk to SQL
from dotenv import load_dotenv # <--- Library to read .env
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from Matcher import TutorMatcher

load_dotenv()
app = FastAPI()

# --- 1. CONFIGURATION ---
# Allow React (localhost:5173) to talk to Python (localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 2. LOAD DATA (Profiles) ---
# We load the "Human Data" (Names/Bios) here to merge with the "Math Data"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_tutor_profile(tutor_id: int) -> dict:

    conn = None
    try:
        # Connect using the secrets from .env
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            port=os.getenv("DB_PORT", "5432")
        )
        
        cur = conn.cursor()
        
        """
        Fetch tutor details (Name, Bio, etc.) from the 'Database'.
        TODO: Replace this logic with a real DB query later.
        e.g., return cursor.execute("SELECT * FROM tutors WHERE id=?", tutor_id)
        """
        query = "SELECT name, bio, subject, email FROM tutors WHERE id = %s"
        cur.execute(query, (tutor_id,))
        
        row = cur.fetchone()
        
        cur.close()
        conn.close()

        if row:
            # Map the SQL result (Row 0, Row 1...) to your UI names
            return {
                "name": row[0],
                "bio": row[1],
                "subject": row[2],
                "email": row[3]
            }
        else:
            return {} # Not found

    except Exception as e:
        print(f"Database Connection Error: {e}")
        return {}
    
    
# Optimization
try:
    matcher = TutorMatcher()
except FileNotFoundError as e:
    print(f"Error initializing matcher: {e}")
    matcher = None

class StudentResponse(BaseModel):
    scores: List[int] 

@app.post("/api/recommend")
async def recommend(data: StudentResponse):
    if not matcher:
        raise HTTPException(status_code=500, detail="AI Model not loaded.")

    # Returns: [{'tutor': {id: 101...}, 'score': 95, 'raw_distance': 0.5}, ...]
    raw_matches = matcher.find_matches(data.scores, top_k=3)
    
    final_response = []
    
    for m in raw_matches:
        tutor_id = m['tutor']['id']
        match_score = int(m['score'])
        
        profile = get_tutor_profile(tutor_id)
        
        result_card = {
            "id": tutor_id,
            "score": match_score,
            "name": profile.get("name", f"Tutor #{tutor_id}"),
            "subject": profile.get("subject", "General"),
            "bio": profile.get("bio", "No bio available."),
            "email": profile.get("email", ""),
            # UI flair
            "color": "bg-indigo-100 text-indigo-800"
        }
        final_response.append(result_card)
        
    return final_response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)