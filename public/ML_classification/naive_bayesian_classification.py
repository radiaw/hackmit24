#for parkinsons
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np

app = Flask(__name__)

# Naive Bayes Model training function
def train_naive_bayes(train_data):
    class_0_data = train_data[train_data['Diagnosis'] == 0]
    class_1_data = train_data[train_data['Diagnosis'] == 1]
    p_y_0 = len(class_0_data) / len(train_data)
    p_y_1 = len(class_1_data) / len(train_data)
    probabilities_0 = {column: class_0_data[column].value_counts(normalize=True).to_dict() for column in train_data.columns[:-1]}
    probabilities_1 = {column: class_1_data[column].value_counts(normalize=True).to_dict() for column in train_data.columns[:-1]}
    return p_y_0, p_y_1, probabilities_0, probabilities_1

def predict(test_data, p_y_0, p_y_1, probabilities_0, probabilities_1):
    prob_0 = np.log(p_y_0)
    prob_1 = np.log(p_y_1)
    for column in test_data.columns[:-1]:
        value = test_data[column].iloc[0]
        prob_0 += 1  # Laplace smoothing
        prob_1 += 1
    return 0 if prob_0 > prob_1 else 1

# Define the prediction API route
@app.route("/predict", methods=["POST"])
def predict_diagnosis():
    data = request.json
    test_data = pd.DataFrame([data])  # Convert the incoming JSON data into a pandas DataFrame
    train_data = pd.read_csv('train_data.csv')  # Load your training data (make sure this file is in the right location)
    
    # Train Naive Bayes model on the training data
    p_y_0, p_y_1, probabilities_0, probabilities_1 = train_naive_bayes(train_data)
    
    # Predict based on the incoming test data
    prediction = predict(test_data, p_y_0, p_y_1, probabilities_0, probabilities_1)
    
    return jsonify({"prediction": prediction})

if __name__ == "__main__":
    app.run(debug=True)
