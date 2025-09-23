from flask import Flask, request, jsonify
import joblib
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import ollama # type: ignore
import traceback
from groq import Groq
import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")
try:
    documents = joblib.load("tourism_embeddings.pkl")
    embeddings_matrix = np.array([doc["embedding"] for doc in documents])
    print("✅ Loaded embeddings successfully")
except Exception as e:
    print("❌ Failed to load embeddings:", e)
    documents = []
    embeddings_matrix = np.array([])


app = Flask(__name__)
client = Groq(api_key=API_KEY)
@app.route("/itinerary", methods=["POST"])
def itinerary():
    data = request.json
    days = data.get("days")
    people = data.get("people")
    budget = data.get("budget")

    prompt = f"Create a {days}-day itinerary for {people} people with a budget of ₹{budget}. Use headings for days and bold for places."
    print(f"Prompt: {prompt}")
    completion = client.chat.completions.create(
        model="qwen/qwen3-32b",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6,
        max_completion_tokens=4096,
        top_p=0.95,
        stream=False
    )

    result_text = completion.choices[0].message.content
    return jsonify({"result": result_text[6:]})



@app.route("/chat", methods=["POST"])
def chat():
    try:
        user_input = request.json.get("message", "").strip()
        if not user_input:
            return jsonify({"response": "Please provide a message."})

        print(f"User input: {user_input}")

        # Generate embedding with error handling
        try:
            response = ollama.embeddings(model="mxbai-embed-large", prompt=user_input)
            user_embedding = np.array(response["embedding"]).reshape(1, -1)
        except Exception as e:
            print("❌ Ollama embedding error:", e)
            traceback.print_exc()
            return jsonify({"response": "Sorry, failed to generate embeddings. Please try again."})

        # If embeddings failed to load
        if embeddings_matrix.size == 0:
            return jsonify({"response": "No embeddings available on the server."})

        # Compute cosine similarity
        similarities = cosine_similarity(user_embedding, embeddings_matrix)[0]
        best_idx = int(np.argmax(similarities))
        best_doc = documents[best_idx]

        print(f"Matched doc: {best_doc['title']}")
        return jsonify({"response": best_doc["text"], "title": best_doc["title"]})

    except Exception as e:
        print("❌ Unexpected error in /chat:", e)
        traceback.print_exc()
        return jsonify({"response": "An unexpected error occurred. Please try again."})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
