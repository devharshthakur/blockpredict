import sys
import json
import pickle
import torch
import torch.nn as nn
from transformers import BertTokenizer, BertModel
import pandas as pd
import numpy as np

# 1. Function to load all the models (company, nasdaq, and sentiment models)
# This is called at the beginning of the script to initialize the models for predictions.
def load_models():
    # Load compVsnifty model (Model 1)
    with open('models/xgboost_model_compVsnifty.pkl', 'rb') as f:
        loaded_model1 = pickle.load(f)

    # Load niftyVsnasdaq model (Model 2)
    with open('models/xgboost_model_niftyVsnasdaq.pkl', 'rb') as f:
        loaded_model2 = pickle.load(f)

    # Define the BERT sentiment analysis model class
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

    # Load the sentiment analysis model weights (Model 3)
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    loaded_model3 = SentimentAnalysisModel()
    loaded_model3.load_state_dict(torch.load('models/bert_stock_sentiment_model.pth', map_location=device))
    loaded_model3.to(device)
    loaded_model3.eval()

    # Return all the loaded models and the device
    return loaded_model1, loaded_model2, loaded_model3, device

# 2. Function to predict using the compVsnifty model (Model 1)
# This function accepts input data and makes predictions using the compVsnifty model.
def predict_compVsnifty(model, input_data):
    df = pd.DataFrame([input_data])  # Create a DataFrame for model input
    y_pred = model.predict(df)  # Make the prediction
    return int(y_pred[0])  # Return the prediction as an integer

# 3. Function to predict using the niftyVsnasdaq model (Model 2)
# This function accepts input data and makes predictions using the niftyVsnasdaq model.
def predict_niftyVsnasdaq(model, input_data):
    df = pd.DataFrame([input_data])  # Create a DataFrame for model input
    y_pred = model.predict(df)  # Make the prediction
    return int(y_pred[0])  # Return the prediction as an integer

# 4. Function to predict using the BERT sentiment analysis model (Model 3)
# This function tokenizes news articles, makes sentiment predictions, and returns an average sentiment score.
def predict_sentiment(model, tokenizer, device, news_articles):
    input_ids = []
    attention_masks = []
    
    # Tokenize each article
    for text in news_articles:
        inputs = tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=512,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt'
        )
        input_ids.append(inputs['input_ids'])
        attention_masks.append(inputs['attention_mask'])

    # Concatenate input tensors
    input_ids = torch.cat(input_ids, dim=0).to(device)
    attention_masks = torch.cat(attention_masks, dim=0).to(device)

    # Run the model in evaluation mode (disable gradient calculation)
    with torch.no_grad():
        outputs = model(input_ids, attention_mask=attention_masks)

    # Apply sigmoid activation and threshold to get predictions
    predictions = torch.sigmoid(outputs).squeeze().cpu().numpy()
    sentiment_output = np.where(predictions > 0.5, 1, -1)  # Sentiment values: -1 for negative, 1 for positive

    # Calculate the average sentiment for all articles
    average_sentiment = np.mean(sentiment_output)
    return 1 if average_sentiment > 0 else 0  # Return 1 if positive, 0 if negative

# 5. Function to perform weighted voting on the three model predictions
# This function applies the provided weights to each prediction and returns the final prediction.
def weighted_voting(predictions, weights):
    weighted_sum = sum(p * w for p, w in zip(predictions, weights))  # Compute weighted sum
    return 1 if weighted_sum > 0.5 * sum(weights) else 0  # Return 1 if weighted sum exceeds the threshold

# 6. Main function to handle the entire prediction process
# This function loads models, reads inputs from stdin, performs predictions, and outputs the results.
def main():
    # Load all models (Model 1: compVsnifty, Model 2: niftyVsnasdaq, Model 3: BERT Sentiment)
    loaded_model1, loaded_model2, loaded_model3, device = load_models()
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

    # Read JSON input from stdin
    input_data = sys.stdin.read()
    input_json = json.loads(input_data)

    # Extract inputs from the JSON
    model1_inputs = input_json['model1Inputs']  # Inputs for compVsnifty (Model 1)
    model2_inputs = input_json['model2Inputs']  # Inputs for niftyVsnasdaq (Model 2)
    news_articles = input_json['newsArticles']  # News articles for sentiment analysis (Model 3)
    weights = input_json['weights']  # Weights for weighted voting

    # Perform predictions for each model
    y_pred1 = predict_compVsnifty(loaded_model1, model1_inputs)
    y_pred2 = predict_niftyVsnasdaq(loaded_model2, model2_inputs)
    y_pred3 = predict_sentiment(loaded_model3, tokenizer, device, news_articles)

    # Apply weighted voting to combine predictions
    final_prediction = weighted_voting([y_pred1, y_pred2, y_pred3], weights)

    # Prepare output as a JSON object
    output = {
        'predictions': {
            'model1': y_pred1,
            'model2': y_pred2,
            'model3': y_pred3,
            'finalPrediction': final_prediction
        }
    }

    # Output the result to stdout in JSON format
    print(json.dumps(output))

# 7. Conditional execution to ensure the script runs when executed directly
# This ensures that the main function is called when the script is run as a standalone script.
if __name__ == '__main__':
    main()
