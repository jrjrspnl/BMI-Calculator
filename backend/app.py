from flask import Flask, request, jsonify,render_template
from flask_cors import CORS
import os
app = Flask(__name__)
CORS(app) 

@app.route("/calculate_bmi", methods=["POST"])

def calculate_bmi():
    data = request.get_json()

    unit_system = data.get("unit_system")
    height_feet = data.get("height_feet")
    height_inches = data.get("height_inches")
    height_cm = data.get("height_cm")
    weight_pounds = data.get("weight_pounds")
    weight_kg = data.get("weight_kg")
    age = data.get("age")
    sex = data.get("sex")
    activity_level = data.get("activity_level")

    try:
        if unit_system == "standard":
            height_m = ((float(height_feet) * 12) + float(height_inches)) * 0.0254
            weight_kg = float(weight_pounds) * 0.453592
        else:
            height_m = float(height_cm) / 100
            weight_kg = float(weight_kg)

        bmi = weight_kg / (height_m ** 2)

        if bmi < 18.5:
          category = "Underweight"
        elif bmi < 25:
          category = "Healthy"
        elif bmi < 30:
          category = "Overweight"
        else:
          category = "Obesity"

        feedback = ""

        if bmi < 18.5 and sex == "Male" and activity_level == "Sedentary":
          feedback = (
            "Your BMI indicates you are underweight. As a man with a sedentary lifestyle, "
            "your body may not be getting enough nutrients to maintain muscle mass. "
            "Try adding more calorie-dense, nutrient-rich foods and start light exercises "
            "to gradually build strength and metabolism."
        )

        elif bmi < 18.5 and sex == "Female" and activity_level == "Sedentary":
          feedback = (
            "You are underweight with a sedentary lifestyle. As a woman, you may need more "
            "balanced nutrition with healthy fats, protein, and iron to support hormonal health. "
            "Gentle physical activity can also help improve energy and appetite."
        )

        elif bmi < 18.5 and activity_level in ["Active", "Very Active"]:
            feedback = (
                "Your BMI is underweight, but your activity level is high. Ensure you’re consuming "
                "enough calories and nutrients to support your energy output and maintain a healthy weight."
            )

        elif 18.5 <= bmi < 25:
            feedback = (
                "Your BMI is in the healthy range. Keep maintaining your balanced diet and "
                "regular physical activity to stay fit and strong."
            )

        elif 25 <= bmi < 30 and sex == "Male" and activity_level == "Sedentary":
            feedback = (
                "Your BMI suggests you’re slightly overweight. As a sedentary male, try incorporating "
                "light exercises like walking or home workouts, and reduce sugary or processed foods "
                "to manage your weight."
            )

        elif 25 <= bmi < 30 and sex == "Female" and activity_level == "Lightly Active":
            feedback = (
                "You’re slightly above the healthy BMI range. As a lightly active woman, "
                "consider increasing your movement through daily activities and focusing on "
                "balanced, portion-controlled meals."
            )

        elif bmi >= 30:
            feedback = (
                "Your BMI falls in the obesity range. This can increase the risk of chronic diseases. "
                "Consider consulting a healthcare professional for a tailored diet and exercise plan "
                "to gradually reach a healthier weight."
            )
        else:
            feedback = (
                "Your BMI result has been calculated. For more accurate advice, consider reviewing "
                "your daily habits, diet, and physical activity."
            )
            
        note = (
            "\n\n BMI is a screening measure and does not diagnose disease or health status. "
            "Consult your healthcare provider to discuss your results, as they can help identify possible causes "
            "and recommend personalized treatment or lifestyle adjustments."
        )

        result = {
            "bmi": round(bmi, 1),
            "category": category,
            "age": age,
            "sex": sex,
            "activity_level": activity_level,
            "feedback": feedback,
            "note": note
        }

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
