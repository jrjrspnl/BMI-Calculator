from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os
from RuleBasedLogic import classify_bmi, recommend_exercise

app = Flask(__name__)
CORS(app)  # ✅ Allow React frontend (localhost:3000) to call Flask backend

# ✅ Load your custom exercise dataset
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(BASE_DIR, "exercise_data.json"), "r", encoding="utf-8") as f:
    EXERCISE_DATA = json.load(f)


@app.route('/calculate_bmi', methods=['POST'])
def calculate_bmi():
    data = request.get_json()
    unit = data.get('unit_system', 'metric')

    # ✅ Convert input based on selected unit system
    if unit == "standard":
        height_in_inches = (data.get('height_feet', 0) * 12) + data.get('height_inches', 0)
        height_m = height_in_inches * 0.0254
        weight_kg = data.get('weight_pounds', 0) * 0.453592
    else:
        height_m = data.get('height_cm', 0) / 100
        weight_kg = data.get('weight_kg', 0)

    # ✅ Validate inputs
    if height_m <= 0 or weight_kg <= 0:
        return jsonify({"error": "Invalid height or weight"}), 400

    # ✅ Calculate BMI
    bmi = weight_kg / (height_m ** 2)
    category = classify_bmi(bmi)
    feedback = recommend_exercise(category)  # List of rule-based tags, e.g. ["cardio", "low-impact"]

    # ✅ Match exercises from JSON dataset
    recommended_exercises = []
    for exercise in EXERCISE_DATA.get("exercises", []):
        # Each exercise in JSON should have "category" or "tags" fields
        if any(tag.lower() in [f.lower() for f in feedback] for tag in exercise.get("tags", [])):
            recommended_exercises.append(exercise)

    # Limit the output to avoid overloading frontend
    recommended_exercises = recommended_exercises[:5]

    # ✅ Response to frontend
    return jsonify({
        "bmi": round(bmi, 2),
        "category": category,
        "feedback": f"You are {category.lower()}. Based on your result, here are some recommended exercises.",
        "exercises": recommended_exercises
    })


if __name__ == "__main__":
    app.run(debug=True, port=5001)
