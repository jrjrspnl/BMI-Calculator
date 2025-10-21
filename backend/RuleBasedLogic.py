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

def recommend_exercise(category):
    rules = {
        "Underweight": ["chest", "back"],        # focus on strength
        "Normal": ["cardio", "upper arms"],      # maintain balance
        "Overweight": ["cardio", "waist"],       # focus on fat burn
        "Obese": ["cardio", "lower legs"]        # low-impact movement
    }
    return rules.get(category, ["cardio"])
