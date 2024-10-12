import pickle
import torch
import torch.nn as nn
import pandas as pd
import numpy as np
from transformers import BertTokenizer, BertModel
from typing import Dict
import json
import sys
import os
import csv

# Define the base directory for the models
BASE_DIR = 'D:/COLLEGE PROJECTS/blockpredict/predict/models'

# Load all models first

# Load the CompVsnifty model
with open(os.path.join(BASE_DIR, 'xgboost_model_compVsnifty.pkl'), 'rb') as f:
    loaded_model1 = pickle.load(f)

# Load the NasdaqVsnifty model
with open(os.path.join(BASE_DIR, 'xgboost_model_niftyVsnasdaq.pkl'), 'rb') as f:
    loaded_model2 = pickle.load(f)

# Define the Sentiment Analysis Model
class SentimentAnalysisModel(nn.Module):
    def __init__(self):
        super(SentimentAnalysisModel, self).__init__()
        self.bert = BertModel.from_pretrained('bert-base-uncased')
        self.dropout = nn.Dropout(0.1)
        self.classifier = nn.Linear(self.bert.config.hidden_size, 1)  # Output size is 1

    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids, attention_mask=attention_mask)
        pooled_output = outputs.pooler_output
        pooled_output = self.dropout(pooled_output)
        outputs = self.classifier(pooled_output)
        return outputs

# Load the pre-trained Sentiment Analysis Model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
loaded_model3 = SentimentAnalysisModel()
loaded_model3.load_state_dict(torch.load(os.path.join(BASE_DIR, 'bert_stock_sentiment_model.pth'), map_location=device))
loaded_model3.to(device)
loaded_model3.eval()

# Load BERT tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# Function to prepare input for sentiment analysis
def prepare_input(texts):
    input_ids = []
    attention_masks = []
    for text in texts:
        encoded = tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=128,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt'
        )
        input_ids.append(encoded['input_ids'])
        attention_masks.append(encoded['attention_mask'])

    input_ids = torch.cat(input_ids, dim=0).to(device)
    attention_masks = torch.cat(attention_masks, dim=0).to(device)

    return input_ids, attention_masks

# Function to make sentiment predictions
def predict_sentiment(news_articles):
    if not news_articles:
        news_articles = get_sample_articles()  # Get sample articles if news_articles is empty
    input_ids, attention_masks = prepare_input(news_articles)
    with torch.no_grad():
        outputs = loaded_model3(input_ids, attention_mask=attention_masks)
        probabilities = torch.sigmoid(outputs).squeeze().cpu().numpy()
        sentiments = np.where(probabilities > 0.5, 1, 0)  # 1 for positive, 0 for negative

    return np.mean(sentiments)  # Aggregate sentiment score for all news articles

# Function to get sample articles from CSV file
def get_sample_articles():
    sample_articles = []
    csv_file_path = 'D:/COLLEGE PROJECTS/blockpredict/predict/nifty_it_50_stock_news.csv'
    with open(csv_file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            sample_articles.append(row['Description'])
            if len(sample_articles) >= 5:  # Limit to 5 sample articles
                break
    return sample_articles

# Main function to run all models
def main():
    input_data = json.load(sys.stdin)

    model1_inputs = input_data['model1Inputs']
    model2_inputs = input_data['model2Inputs']
    news_articles = input_data.get('newsArticles', [])  # Use get to provide a default value
    weights = input_data['weights']

    X_test1 = pd.DataFrame([model1_inputs])
    X_test2 = pd.DataFrame([model2_inputs])

    y_pred1 = loaded_model1.predict(X_test1)[0]
    y_pred2 = loaded_model2.predict(X_test2)[0]
    y_pred3 = predict_sentiment(news_articles)

    predictions = {
        'model1': int(y_pred1),
        'model2': int(y_pred2),
        'model3': int(y_pred3),
        'finalPrediction': weighted_voting([y_pred1, y_pred2, y_pred3], weights)
    }

    print(json.dumps({'predictions': predictions}))

def weighted_voting(predictions, weights):
    weighted_sum = sum(p * w for p, w in zip(predictions, weights))
    return 1 if weighted_sum > 0.5 * sum(weights) else 0

if __name__ == "__main__":
    main()