# RuleBasedLogic.py

def classify_bmi(bmi: float) -> str:
    """
    Classify BMI value into a category.
    """
    if bmi < 18.5:
        return "Underweight"
    elif 18.5 <= bmi < 24.9:
        return "Normal"
    elif 25 <= bmi < 29.9:
        return "Overweight"
    elif 30 <= bmi < 34.9:
        return "Obese"
    else:
        return "Severely Obese"


def recommend_exercise(category: str) -> list:
    """
    Returns a list of exercise tags based on BMI category.
    These tags match those found in exercise_data.json.
    """
    rules = {
        "Underweight": ["underweight", "strength"],
        "Normal": ["normal", "balance", "flexibility"],
        "Overweight": ["overweight", "low-impact", "cardio"],
        "Obese": ["obese", "low-impact", "cardio"],
        "Severely Obese": ["severely-obese", "low-impact", "mobility"]
    }

    return rules.get(category, ["normal"])
