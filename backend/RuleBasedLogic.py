# rules.py

def classify_bmi(bmi):
    if bmi < 18.5:
        return "Underweight"
    elif 18.5 <= bmi < 24.9:
        return "Normal weight"
    elif 25 <= bmi < 29.9:
        return "Overweight"
    else:
        return "Obese"

def recommend_exercise(bmi_category):
    rules = {
        "Underweight": ["yoga", "strength"],
        "Normal weight": ["cardio", "flexibility"],
        "Overweight": ["low impact", "aerobic"],
        "Obese": ["walking", "stretching"]
    }
    return rules.get(bmi_category, [])
