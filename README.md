# Nutrition Counter App

## Overview

The Nutrition Counter app is designed to empower users to make healthier food choices by scanning product photos, extracting relevant information, and providing recommendations on the nutritional content. This application caters to health-conscious individuals, fitness enthusiasts, those managing their weight, the elderly population, as well as students and young adults lacking knowledge of nutrition.

## Stakeholders

1. **Health-Conscious Individuals**
2. **Fitness Enthusiasts**
3. **Weight Management Seekers**
4. **Elderly Population**
5. **Students and Young Adults Lacking Nutrition Knowledge**

## Requirements in Detail

| ID  | Requirement Name                  | Description                                               | Category  |
| --- | --------------------------------- | --------------------------------------------------------- | --------- |
| 1   | Product Photo Scanning            | Scan product photos to extract ingredient/calorie tables  | Frontend  |
| 2   | OCR for Text Extraction           | Extract text data from scanned images                     | Backend   |
| 3   | Ingredient and Calorie Parsing    | Identify ingredients and calorie info from text data       | Backend   |
| 4   | Unhealthy ingredients Evaluation        | Count number of unhealthy ingredients            | Backend   |
| 5   | User Feedback and Suggestions     | Display healthy or unhealthy suggestion to the user               | Frontend  |

## Flow

1. **User Uploads Image:** Users upload an image from their gallery through the application.

2. **Image Processing in Backend:** The image is sent to the backend, where Optical Character Recognition (OCR) is used to extract text data from the image.

3. **Text Data Processing:** Extracted text data is processed to identify ingredients and calorie information.

4. **Unhealthy ingredients Evaluation:** The backend evaluates the number of unhealthy ingredients

5. **User Feedback and Suggestions:** The frontend displays feedback and suggestions to the user based on the unhealthy ingredients evaluation.

## API Sample

To upload an image for processing, use the following API endpoint:

- **URL:** `http://127.0.0.1:5000/upload`
- **Method:** `POST`
- **Headers:** `Content-Type: multipart/form-data`
- **Body:**
  - `file: image.png`

## Installation and Run App

To run the Nutrition Counter app locally, follow these steps:

1. Clone the repository.
   ```bash
   git clone https://github.com/your/repository.git
2. Go into project directory
    ```
    cd nutrition-counter-app
3. Install BE dependencies
    ```
    pip install Flask jsonify requests pytesseract opencv-python numpy pillow pyspellchecker
    ```
4. For FE dependencies
    ```
    npm install
5. To run the FE:
    ```
    npx react-native run-android
    ```
6. To run BE:
    ```
    cd Backend
    python beckend.py
