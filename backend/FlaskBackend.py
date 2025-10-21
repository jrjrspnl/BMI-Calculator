from flask import Flask, render_template, request, jsonify
import requests
from RuleBasedLogic import classify_bmi, recommend_exercise

app = Flask(__name__)


EXERCISE_API_URL = "https://exercisedb.p.rapidapi.com/exercises"
HEADERS = {
    "x-rapidapi-key": "YOUR_RAPIDAPI_KEY",
    "x-rapidapi-host": "exercisedb.p.rapidapi.com"
}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/calculate', methods=['POST'])
def calculate_bmi():
    height = float(request.form['height']) / 100  # cm to meters
    weight = float(request.form['weight'])
    bmi = weight / (height ** 2)
    bmi_category = classify_bmi(bmi)


    # Apply rule-based logic for exercises
    categories = recommend_exercise(bmi_category)
    exercises = []

    for c in categories:
        response = requests.get(f"{EXERCISE_API_URL}/bodyPart/{c}", headers=HEADERS)
        if response.status_code == 200:
            data = response.json()
            exercises.extend(data[:3])  # get 3 sample exercisee

    return render_template(
        'index.html',
        bmi=round(bmi, 2),
        bmi_category=bmi_category,
        exercises=exercises
    )
if __name__ == "__main__":
    app.run(debug=True,port=5050)



