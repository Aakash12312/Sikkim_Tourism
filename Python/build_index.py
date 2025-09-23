import json
import ollama
import joblib
import numpy as np

# Load your JSON file
with open("data/sikkim_tourism.json", "r", encoding="utf-8") as f:
    documents = json.load(f)

# Generate embeddings with Ollama and add them to each entry
for doc in documents:
    response = ollama.embeddings(model="mxbai-embed-large", prompt=doc["text"])
    doc["embedding"] = np.array(response["embedding"])  # store as numpy array

# Save to disk with joblib
joblib.dump(documents, "tourism_embeddings.pkl")
print("✅ Embeddings saved!")