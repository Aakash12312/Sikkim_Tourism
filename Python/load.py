import joblib
import numpy as np
import ollama

# Load embeddings
documents = joblib.load("tourism_embeddings.pkl")

# Cosine similaritynumpy.linalg
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Search function
def search(query, top_k=3):
    q_vec = np.array(ollama.embeddings(model="mxbai-embed-large", prompt=query)["embedding"])
    scores = [(doc["title"], doc["text"], cosine_similarity(q_vec, doc["embedding"])) for doc in documents]
    scores.sort(key=lambda x: x[2], reverse=True)
    return scores[:top_k]

# Example query
results = search("Rumtek Monastery")
for title, text, score in results:
    print(f"\n🔹 {title} (score={score:.3f})\n{text[:200]}...")
