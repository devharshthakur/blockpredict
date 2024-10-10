# predict.py
import torch
import pickle
import pandas as pd
import requests
from transformers import BertTokenizer
from xgboost import XGBClassifier

# Load models
with open('xgboost_model_compVsnifty.pkl', 'rb') as f:
    comp_model = pickle.load(f)

with open('xgboost_model_niftyVsnasdaq.pkl', 'rb') as f:
    nasdaq_model = pickle.load(f)

# Load BERT sentiment analysis model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
bert_model = torch.load('bert_stock_sentiment_model.pth', map_location=device)
bert_model.eval()
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

def predict_sentiment(text):
    inputs = tokenizer.encode_plus(
        text, add_special_tokens=True, max_length=512, return_tensors='pt', truncation=True
    )
    input_ids = inputs['input_ids'].to(device)
    attention_mask = inputs['attention_mask'].to(device)
    with torch.no_grad():
        outputs = bert_model(input_ids, attention_mask=attention_mask)
    sentiment = torch.sigmoid(outputs).item()
    return 1 if sentiment > 0.5 else 0

def predict_nifty_vs_comp(input_data):
    df = pd.DataFrame(input_data)
    return comp_model.predict(df)[0]

def predict_nifty_vs_nasdaq(input_data):
    df = pd.DataFrame(input_data)
    return nasdaq_model.predict(df)[0]

def weighted_voting(predictions, weights):
    return 1 if sum(p * w for p, w in zip(predictions, weights)) > sum(weights) / 2 else 0

# Fetch weights from the blockchain
response = requests.get("http://127.0.0.1:3001/weights")
weights = response.json()

# Prepare inputs
model1_input = {...}  # Replace with actual input data
model2_input = {...}
news = "Moneycontrol had reported..."

# Make predictions
model1_pred = predict_nifty_vs_comp(model1_input)
model2_pred = predict_nifty_vs_nasdaq(model2_input)
model3_pred = predict_sentiment(news)

# Perform weighted voting
final_prediction = weighted_voting([model1_pred, model2_pred, model3_pred], [weights['model1'], weights['model2'], weights['model3']])

# Compare with actual event
actual_event = 1  # Replace with actual data

# Send predictions to blockchain
requests.post("http://127.0.0.1:3001/blockchain/update", json={
    "model1": model1_pred,
    "model2": model2_pred,
    "model3": model3_pred,
    "actualEvent": actual_event
})
