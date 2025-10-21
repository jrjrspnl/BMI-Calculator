import React, { useState } from "react";

const Input = () => {
  const [unitSystem, setUnitSystem] = useState("standard");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weightPounds, setWeightPounds] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [bmiResult, setBmiResult] = useState(null);

  const handleCalculate = async () => {
    if (
      !sex ||
      !activityLevel ||
      (!heightCm && (!heightFeet || !heightInches)) ||
      (!weightKg && !weightPounds) ||
      !age
    ) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    setLoading(true);

    const data = {
      unit_system: unitSystem,
      height_feet: heightFeet ? parseFloat(heightFeet) : null,
      height_inches: heightInches ? parseFloat(heightInches) : null,
      height_cm: heightCm ? parseFloat(heightCm) : null,
      weight_pounds: weightPounds ? parseFloat(weightPounds) : null,
      weight_kg: weightKg ? parseFloat(weightKg) : null,
      age: age ? parseInt(age) : null,
      sex,
      activity_level: activityLevel,
    };

    try {
      const response = await fetch("http://127.0.0.1:5001/calculate_bmi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("BMI Result:", result);
      setBmiResult(result);
      setShowResults(true);
    } catch (error) {
      alert("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setHeightFeet("");
    setHeightInches("");
    setWeightPounds("");
    setHeightCm("");
    setWeightKg("");
    setAge("");
    setSex("");
    setActivityLevel("");
    setShowResults(false);
  };

  const getRowClass = (category) => {
    if (!bmiResult?.category) return "";

    switch (bmiResult.category) {
      case "Underweight":
        return category === "Underweight" ? "bg-yellow-100" : "";
      case "Healthy":
      case "Normal":
        return category === "Healthy" ? "bg-green-100" : "";
      case "Overweight":
        return category === "Overweight" ? "bg-orange-100" : "";
      case "Obesity":
        return category === "Obesity" ? "bg-red-100" : "";
      default:
        return "";
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center gap-5 py-15 p-2">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-800 text-center">
        Monitor your{" "}
        <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-green-400 bg-clip-text text-transparent font-semibold">
          Health & Wellness
        </span>
      </h1>

      <p className="max-w-4xl text-center text-neutral-600 px-4 text-normal lg:text-lg">
        Body Mass Index (BMI) is a simple measure of body fat based on height
        and weight for adults. It helps estimate whether your weight is healthy,
        but it doesn't consider muscle, bone, or overall body composition. Your
        healthcare provider can help decide if your BMI is right for you.
      </p>

      {!showResults && (
        <div className="mt-5 w-full max-w-4xl px-4">
          <div className="border border-blue-300 bg-neutral-50 shadow-md rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white px-4 sm:px-6 py-4 sm:py-5 font-semibold text-base sm:text-lg">
              Calculate your Body Status
            </div>

            <div className="w-full p-6 md:p-10">
              <div className="flex sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
                <div className="flex gap-6 sm:gap-8">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="standard"
                      name="unit-system"
                      checked={unitSystem === "standard"}
                      className="scale-125 accent-blue-600"
                      onChange={() => setUnitSystem("standard")}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Standard
                    </span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="metric"
                      name="unit-system"
                      className="scale-125 accent-blue-600"
                      checked={unitSystem === "metric"}
                      onChange={() => setUnitSystem("metric")}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Metric
                    </span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-medium font-medium text-neutral-500 underline hover:text-blue-600 transition cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {unitSystem === "standard" ? (
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-18 mb-8">
                    <div className="space-y-2 w-full sm:w-auto">
                      <h1 className="font-medium mb-2">Height</h1>
                      <div className="flex gap-3 sm:gap-5">
                        <select
                          id="height-feet"
                          name="height-feet"
                          value={heightFeet}
                          onChange={(e) => setHeightFeet(e.target.value)}
                          className="p-2 border border-gray-300 rounded-lg flex-1 sm:flex-none"
                        >
                          <option value="">Feet</option>
                          {[...Array(6)].map((_, i) => (
                            <option key={i + 3} value={i + 3}>
                              {i + 3}
                            </option>
                          ))}
                        </select>

                        <select
                          id="height-inches"
                          name="height-inches"
                          value={heightInches}
                          onChange={(e) => setHeightInches(e.target.value)}
                          className="p-2 border border-gray-300 rounded-lg flex-1 sm:flex-none"
                        >
                          <option value="">Inches</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2 w-full sm:w-auto">
                      <h1 className="font-medium mb-2">Weight</h1>
                      <div>
                        <input
                          type="text"
                          className="p-2 border border-gray-300 rounded-lg w-full sm:w-32"
                          placeholder="Pounds"
                          value={weightPounds}
                          onChange={(e) => setWeightPounds(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex-col">
                      <h1 className="font-medium mb-2">Age</h1>
                      <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-lg w-full sm:w-24"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <h1 className="font-medium mb-2">Sex</h1>
                      <select
                        className="p-2 border border-gray-300 rounded-lg w-full"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="flex-col">
                      <div></div>
                      <h1 className="font-medium mb-2">Activity level</h1>
                      <select
                        className="p-2 border border-gray-300 rounded-lg w-full"
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Sedentary">Sedentary</option>
                        <option value="Lightly Active">Lightly Active</option>
                        <option value="Active">Active</option>
                        <option value="Very Active">Very Active</option>
                      </select>
                      <p className="text-sm text-gray-500 mb-2 max-w-xs mt-2">
                        Select how active you are on a typical day to improve
                        the accuracy of your BMI result.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-32 mb-8">
                    <div className="space-y-2 w-full sm:w-auto">
                      <h1 className="font-medium mb-2">Height</h1>
                      <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-lg w-full sm:w-32"
                        placeholder="Centimeters"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 w-full sm:w-auto">
                      <h1 className="font-medium mb-2">Weight</h1>
                      <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-lg w-full sm:w-32"
                        placeholder="Kilograms"
                        value={weightKg}
                        onChange={(e) => setWeightKg(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex-col">
                      <h1 className="font-medium mb-2">Age</h1>
                      <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-lg w-full sm:w-24"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <h1 className="font-medium mb-2">Sex</h1>
                      <select
                        className="p-2 border border-gray-300 rounded-lg w-full"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="flex-col">
                      <div></div>
                      <h1 className="font-medium mb-2">Activity level</h1>
                      <select
                        className="p-2 border border-gray-300 rounded-lg w-full"
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Sedentary">Sedentary</option>
                        <option value="Lightly Active">Lightly Active</option>
                        <option value="Active">Active</option>
                        <option value="Very Active">Very Active</option>
                      </select>
                      <p className="text-sm text-gray-500 mb-2 max-w-xs mt-2">
                        Select how active you are on a typical day to improve
                        the accuracy of your BMI result.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleCalculate}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 
             hover:from-blue-700 hover:via-cyan-600 hover:to-green-600 
             rounded-full px-10 py-2 font-semibold text-white cursor-pointer 
             transition-all duration-200 w-full sm:w-auto disabled:opacity-50 
             disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Calculating...
                  </>
                ) : (
                  "Calculate"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showResults && (
        <div className="mt-5 w-full max-w-4xl px-2">
          <div className="border border-blue-300 bg-neutral-50 shadow-md rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white px-4 sm:px-6 py-4 sm:py-5 font-semibold text-base sm:text-lg">
              Adult BMI Calculator
            </div>
            <div className="p-10">
              <div className="flex justify-end">
                <h1
                  onClick={() => setShowResults(false)}
                  className="text-sm md:text-medium font-medium text-neutral-500 underline hover:text-blue-600 transition cursor-pointer"
                >
                  Back to Calculator
                </h1>
              </div>
              <div className="pb-5 mt-5">
                <h1 className="text-2xl lg:text-3xl tracking-wide pb-4 font-medium text-neutral-800 ">
                  Information Provided
                </h1>
                <hr className=" border-gray-400" />
                <div className="flex flex-col md:flex-row justify-between lg:flex-row gap-5 lg:gap-20 pt-5">
                  <div>
                    <h1 className="text-sm md:text-lg font-medium flex-col">
                      Height:{" "}
                    </h1>
                    <span className="text-green-600 font-semibold">
                      {heightCm || `${heightFeet}'${heightInches}"`}
                    </span>
                  </div>

                  <div>
                    <h1 className="text-md md:text-lg font-medium ">Weight:</h1>
                    <span className="text-green-600 font-semibold">
                      {weightKg || `${weightPounds} lbs`}
                    </span>
                  </div>

                  <div>
                    <h1 className="text-md md:text-lg font-medium ">Age:</h1>
                    <span className="text-green-600 font-semibold">{age}</span>
                  </div>

                  <div>
                    <h1 className="text-md md:text-lg font-medium">Sex:</h1>
                    <span className="text-green-600 font-semibold">{sex}</span>
                  </div>

                  <div>
                    <h1 className="text-md md:text-lg font-medium">
                      Activity level:
                    </h1>
                    <span className="text-green-600 font-semibold">
                      {activityLevel}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-2xl lg:text-3xl tracking-wide pb-4 font-medium text-neutral-800  mt-4">
                  Detailed Results
                </h1>
                <hr className="mb-5 border-gray-400" />
                <div className="border border-gray-300 p-8 rounded-xl bg-white mb-6">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-5xl font-bold text-blue-600">
                      {" "}
                      {bmiResult?.bmi?.toFixed(1) ?? "—"}
                    </h1>
                    <h2 className="text-2xl font-semibold text-green-600">
                      {bmiResult?.category ?? ""}
                    </h2>
                    <p className="text-gray-600 text-center max-w-md mt-2 text-sm md:text-base">
                      {bmiResult?.feedback ?? ""}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-neutral-700 text-sm md:text-base">
                    ⚕️ Health Note:{" "}
                    <span className="text-neural-400 font-normal">
                      {bmiResult?.note ?? ""}
                    </span>
                  </p>
                  <hr className="mt-4 border-gray-400" />
                </div>

                <h2 className="font-semibold text-2xl tracking-wide pb-3 pt-4 text-neutral-800">
                  BMI Categories
                </h2>
                <table className="w-full border-collapse bg-neutral-100">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-gray-300">
                      <th className="text-left px-6 py-3 font-semibold text-gray-700 bg-green-300">
                        BMI Category
                      </th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-700 bg-green-300">
                        BMI Range
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      className={`border-b border-gray-200 ${getRowClass(
                        "Underweight"
                      )}`}
                    >
                      <td className="px-6 py-3 font-medium">Underweight</td>
                      <td className="px-6 py-3 text-sm md:text-base">
                        Below 18.5
                      </td>
                    </tr>
                    <tr
                      className={`border-b border-gray-200 ${getRowClass(
                        "Healthy"
                      )}`}
                    >
                      <td className="px-6 py-3 font-medium">Healthy</td>
                      <td className="px-6 py-3 text-sm md:text-base">
                        18.5 – 24.9
                      </td>
                    </tr>
                    <tr
                      className={`border-b border-gray-200 ${getRowClass(
                        "Overweight"
                      )}`}
                    >
                      <td className="px-6 py-3 font-medium">Overweight</td>
                      <td className="px-6 py-3 text-sm md:text-base">
                        25.0 – 29.9
                      </td>
                    </tr>
                    <tr className={`${getRowClass("Obesity")}`}>
                      <td className="px-6 py-3 font-medium">Obesity</td>
                      <td className="px-6 py-3 text-sm md:text-base">
                        30.0 or above
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-3 border-y border-gray-200">
                <a
                  href="/bmi_tbl.pdf"
                  className="text-sm text-blue-600 font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View BMI Tables
                </a>
              </div>
              <div>
                {/* Additional feedback or recommendations can be displayed here */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
