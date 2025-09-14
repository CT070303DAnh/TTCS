import sys
import os

import certifi
ca = certifi.where()

from dotenv import load_dotenv
load_dotenv()
mongo_db_url = os.getenv("MONGO_DB_URL")
print(mongo_db_url)


from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, Request
from uvicorn import run as app_run
from fastapi.responses import Response
from starlette.responses import RedirectResponse
import pandas as pd

from medicprediction.ultils.ultils import load_object
from medicprediction.ultils.model.estimator import MedicModel


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

# from fastapi.templating import Jinja2Templates
# templates = Jinja2Templates(directory="./templates")

@app.get("/", tags=["authentication"])
async def index():
    return RedirectResponse(url="/docs")

# @app.get("/train")
# async def train_route():
#     try:
#         training_pipeline = TrainingPipeline()
#         training_pipeline.run_pipeline()
#         return Response("Training is succesful")
#     except Exception as e:
#         raise NetworkSecurityException(e, sys)
    
# @app.post("/predict")
# async def preditct_route(request:Request, file: UploadFile = File(...)):
#     try:
#         df = pd.read_csv(file.file)

#         preprocessor = load_object("final_model/preprocessor.pkl")
#         final_model = load_object("final_model/model.pkl")
#         network_model = NetworkModel(preprocessor=preprocessor, model=final_model)
#         print(df.iloc[0])
#         y_pred = network_model.predict(df)
#         print(y_pred)
#         df['predict_column'] = y_pred
#         df.to_csv("prediction_output/output.csv")
#         table_html = df.to_html(classes='table table-striped')
#         return templates.TemplateResponse("table.html", {"request": request, "table": table_html})
#     except Exception as e:
#         raise NetworkSecurityException(e, sys)
    
from pydantic import BaseModel
from typing import Optional

class DiabetesFeatures(BaseModel):
    HighBP: int
    HighChol: int
    CholCheck: int
    BMI: float
    Smoker: int
    Stroke: int
    HeartDiseaseorAttack: int
    PhysActivity: int
    Fruits: int
    Veggies: int
    HvyAlcoholConsump: int
    AnyHealthcare: int
    NoDocbcCost: int
    GenHlth: int
    MentHlth: int
    PhysHlth: int
    DiffWalk: int
    Sex: int
    Age: int
    Education: int
    Income: int

class HealthcareFeatures(BaseModel):
    HighBP: int
    HighChol: int
    CholCheck: int
    BMI: float
    Smoker: int
    Stroke: int
    HeartDiseaseorAttack: int
    PhysActivity: int
    Fruits: int
    Veggies: int
    HvyAlcoholConsump: int
    AnyHealthcare: int
    NoDocbcCost: int
    GenHlth: int
    MentHlth: int
    PhysHlth: int
    DiffWalk: int
    Sex: int
    Age: int
    Education: int
    Income: int

@app.post("/predict_diabetes")
def predict_diabetes(features: DiabetesFeatures):
    # Chuyển dữ liệu thành DataFrame để model xử lý
    df = pd.DataFrame([features.dict()])

    # 🔹 Tải model và preprocessor cho diabetes
    preprocessor = load_object("final_model/diabetespreprocessor.pkl")
    final_model = load_object("final_model/diabetesbest_model.pkl")
    network_model = MedicModel(preprocessor=preprocessor, model=final_model)

    # 🔹 Dự đoán
    y_pred = network_model.predict(df)
    
    # Tính điểm nguy cơ dựa trên các yếu tố
    risk_score = calculate_diabetes_risk_score(features)
    
    # Xác định kết quả chẩn đoán
    diagnosis_result = determine_diabetes_result(y_pred[0], risk_score)
    
    # Tạo khuyến nghị
    recommendations = generate_diabetes_recommendations(diagnosis_result, features)
    
    return {
        "prediction": int(y_pred[0]),
        "diagnosisResult": diagnosis_result,
        "riskScore": risk_score,
        "recommendations": recommendations
    }

@app.post("/predict_healthcare")
def predict_healthcare(features: HealthcareFeatures):
    # Chuyển dữ liệu thành DataFrame để model xử lý
    df = pd.DataFrame([features.dict()])

    # 🔹 Tải model và preprocessor cho healthcare
    preprocessor = load_object("final_model/healthcarepreprocessor.pkl")
    final_model = load_object("final_model/healthcarebest_model.pkl")
    network_model = MedicModel(preprocessor=preprocessor, model=final_model)

    # 🔹 Dự đoán
    y_pred = network_model.predict(df)
    
    return {"prediction": int(y_pred[0])}

def calculate_diabetes_risk_score(features: DiabetesFeatures) -> float:
    """Tính điểm nguy cơ tiểu đường dựa trên các yếu tố"""
    score = 0.0
    
    # BMI (0-20 points)
    if features.BMI >= 30:
        score += 20
    elif features.BMI >= 25:
        score += 15
    elif features.BMI >= 23:
        score += 10
    
    # Age (0-15 points)
    if features.Age >= 65:
        score += 15
    elif features.Age >= 45:
        score += 10
    elif features.Age >= 35:
        score += 5
    
    # High Blood Pressure (0-15 points)
    if features.HighBP == 1:
        score += 15
    
    # Physical Activity (0-10 points)
    if features.PhysActivity == 0:
        score += 10
    
    # Smoking (0-10 points)
    if features.Smoker == 1:
        score += 10
    
    # General Health (0-10 points)
    if features.GenHlth >= 4:
        score += 10
    elif features.GenHlth >= 3:
        score += 5
    
    # Heart Disease (0-10 points)
    if features.HeartDiseaseorAttack == 1:
        score += 10
    
    # Stroke (0-10 points)
    if features.Stroke == 1:
        score += 10
    
    return min(score, 100.0)

def determine_diabetes_result(prediction: int, risk_score: float) -> str:
    """Xác định kết quả chẩn đoán"""
    if prediction == 1:
        if risk_score >= 70:
            return "DIABETES"
        elif risk_score >= 50:
            return "HIGH_RISK"
        else:
            return "PREDIABETES"
    else:
        if risk_score >= 40:
            return "HIGH_RISK"
        elif risk_score >= 20:
            return "PREDIABETES"
        else:
            return "NORMAL"

def generate_diabetes_recommendations(result: str, features: DiabetesFeatures) -> str:
    """Tạo khuyến nghị dựa trên kết quả chẩn đoán"""
    recommendations = []
    
    if result == "DIABETES":
        recommendations.extend([
            "• Cần khám bác sĩ ngay để được điều trị",
            "• Theo dõi đường huyết thường xuyên",
            "• Tuân thủ chế độ ăn kiêng nghiêm ngặt",
            "• Tập thể dục đều đặn ít nhất 30 phút/ngày"
        ])
    elif result == "HIGH_RISK":
        recommendations.extend([
            "• Có nguy cơ cao mắc tiểu đường",
            "• Cần kiểm tra định kỳ mỗi 3-6 tháng",
            "• Thay đổi lối sống tích cực",
            "• Giảm cân nếu thừa cân"
        ])
    elif result == "PREDIABETES":
        recommendations.extend([
            "• Cần thay đổi lối sống để ngăn ngừa tiểu đường",
            "• Giảm cân nếu thừa cân",
            "• Tăng cường hoạt động thể chất",
            "• Chế độ ăn lành mạnh, ít đường"
        ])
    else:  # NORMAL
        recommendations.extend([
            "• Chỉ số bình thường",
            "• Duy trì lối sống lành mạnh",
            "• Kiểm tra định kỳ hàng năm"
        ])
    
    # Thêm khuyến nghị cụ thể dựa trên các yếu tố
    if features.BMI >= 25:
        recommendations.append("• Cần giảm cân để giảm nguy cơ")
    
    if features.PhysActivity == 0:
        recommendations.append("• Tăng cường hoạt động thể chất")
    
    if features.Smoker == 1:
        recommendations.append("• Bỏ thuốc lá để giảm nguy cơ")
    
    if features.HighBP == 1:
        recommendations.append("• Kiểm soát huyết áp")
    
    return "\n".join(recommendations)
    
if __name__ == "__main__":
    app_run(app, host="localhost", port=8000)