from flask import Flask, jsonify, request, Response
import os
import re
import csv
import json
app = Flask(__name__)

# import the following libraries 
# will convert the image to text string 
import pytesseract	 

# adds image processing capabilities 
from PIL import Image	 

# converts the text to speech 
import pyttsx3		 

#translates into the mentioned language 
#from googletrans import Translator	 

# opening an image from the source path 

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def read_unhealthy_ingredients_from_csv(csv_file_path):
    """
    Read unhealthy ingredients from a CSV file.

    Parameters:
    - csv_file_path (str): The path to the CSV file containing unhealthy ingredients.

    Returns:
    - list: List of unhealthy ingredients.
    """
    unhealthy_ingredients = []

    with open(csv_file_path, 'r') as csv_file:
        reader = csv.reader(csv_file)
        for row in reader:
            if row:
                unhealthy_ingredients.append(row[0].lower())

    return unhealthy_ingredients

def is_healthy(ingredients, unhealthy_ingredients):
    """
    Determine if a food is healthy based on the percentage of unhealthy ingredients.

    Parameters:
    - ingredients (list): A list of food ingredients.
    - unhealthy_ingredients (list): List of unhealthy ingredients.

    Returns:
    - bool: True if the food is considered healthy, False otherwise.
    """

    # Count the number of unhealthy ingredients
    unhealthy_count = sum(ingredient.lower() in unhealthy_ingredients for ingredient in ingredients)

    # Calculate the percentage of unhealthy ingredients
    percentage_unhealthy = (unhealthy_count / len(ingredients)) * 100

    # Set a threshold for the percentage of unhealthy ingredients
    unhealthy_threshold = 40

    # Check if the percentage exceeds the threshold
    return percentage_unhealthy <= unhealthy_threshold

def process_file(input_file_path):
    with open(input_file_path, 'r') as file:
        # Iterate through each line in the file
        lines = file.readlines()

        # Process each line
        processed_lines = []
        for line in lines:
            # Split words by commas and other special symbols
            words = re.split(",", line)
            
            # Remove empty strings resulting from consecutive delimiters
            words = [word.strip() for word in words if word.strip()]

            processed_lines.extend(words)

    return processed_lines



@app.route('/')
def home():
    print("This will be printed to the terminal")
    return "This is working fine."
@app.route('/getIngredients',methods=['POST'])
def getIngredients():
    data = request.get_json()
    #print(data)
    return jsonify({'message': 'Item added', 'item': data}), 201

@app.route('/upload', methods=['POST'])
def upload_file():
    print("This will be printed to the terminal")
    if 'file' not in request.files:
        return "No file part"
    
    file = request.files['file']
    
    if file.filename == '':
        return "No selected file"
    
    if file:
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        #string3 = model.convert_to_string('uploads/test6.png', formatting='lines')
        #string3=string3+"Working!!"
        #print(string3)
        # opening an image from the source path 
        str = "uploads/" + file.filename
        img = Image.open(str)	 

        # describes image format in the output 
        print(img)						 
        # path where the tesseract module is installed 
        pytesseract.pytesseract.tesseract_cmd ='C:/Program Files/Tesseract-OCR/tesseract.exe'
        # converts the image to result and saves it into result variable 
        result = pytesseract.image_to_string(img) 
        # write text in a text file and save it to source path 
        outputFileName = file.filename.split(".")[0] + ".txt"
        with open(outputFileName, mode ='w') as file:	 
            file.write(result) 
            print(result) 
        result = process_file(outputFileName)
        csv_file_path = "unhealth.csv"  # Update with your CSV file path
        unhealthy_ingredients = read_unhealthy_ingredients_from_csv(csv_file_path)
        if is_healthy(result, unhealthy_ingredients):
            print("This food is healthy!")
            json_data = {'res':True}
            return jsonify(json_data),200
        else:
            print("This food is not healthy.")
            json_data = {'res':False}
            return jsonify(json_data),200
        print(result)
        return "File uploaded successfully"

if __name__ == '__main__':
    print("--------------inside main------------")
    app.run(debug=True)
