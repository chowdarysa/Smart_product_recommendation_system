# Smart Product Recommendation System

## 1. Project Overview
This project provides real-time **product recommendations** using a combination of AWS services:
- **Front-end**: React
- **Back-end**: AWS Lambda + Amazon API Gateway
- **Data Stores**: Amazon DynamoDB
- **Recommendation Engine**: Amazon Personalize

By continuously sending user interaction events to Amazon Personalize, the system can deliver personalized recommendations that adapt in near-real-time without requiring a full model retraining.

## 2. Architecture
1. **Frontend (React)**: A single-page application (SPA) that displays product listings and personalized recommendations.
2. **API Gateway**: Exposes endpoints (e.g., `/fetch_items`, `/record_interactions`, `/get_personal_recommendations`) to the frontend.
3. **AWS Lambda** Functions:
   - **fetch_items**: Retrieves product data from DynamoDB.
   - **record_interactions**: Stores user interactions in DynamoDB and forwards events to Amazon Personalize.
   - **get_personal_recommendations**: Calls Amazon Personalize to fetch recommendations.
4. **DynamoDB**: Maintains both item data (catalog) and historical user interactions.
5. **Amazon Personalize**: Receives real-time interactions and generates personalized recommendations.

## 3. Prerequisites
- **AWS Account** with permissions to create/manage:
  - Lambda functions  
  - Amazon DynamoDB tables  
  - Amazon Personalize resources (campaigns, solutions)  
  - API Gateway endpoints
- **Node.js** (LTS version recommended)
- **npm** or **yarn** (for installing dependencies)

## 4. Installation & Local Setup

### 4.1 Clone the Repository
```bash
git clone https://github.com/chowdarysa/Smart_product_recommendation_system.git
cd SmartProductRecommendation
```
4.2 Front-End Setup
```
npm install
# or
# yarn install

# To start the development server:
npm start
```
4.3 Back-End Setup
```
cd backend
npm install

# Depending on your deployment workflow (Serverless Framework, AWS SAM, etc.):
npm run deploy
```
Make sure you configure environment variables or credentials. Do not commit your .env to GitHub.
5. Deployment Procedures

Build the Front-End:
```
npm run build
```
Deploy the generated build folder to an S3 bucket or an AWS Amplify app for hosting.
Deploy the Back-End:
Using Serverless Framework, AWS SAM, or AWS CLI: set up your Lambda functions, API Gateway endpoints, and DynamoDB tables.
Example (Serverless Framework):
```
cd backend
sls deploy
```
Ensure your AWS credentials are properly configured.
6. Testing Procedures

6.1 Local Testing
Front-End: Run npm run dev in the  and visit http://localhost:5173/.
Back-End (Optional):
If using serverless-offline:
npm run offline
Endpoints will be available at http://localhost:3000/dev/ (or whichever port is configured).
6.2 Post-Deployment Testing
Use Postman or cURL to test your API Gateway endpoints, for example:
curl -X GET https://<api-id>.execute-api.<region>.amazonaws.com/production/fetch_items
Check CloudWatch logs to verify that Lambda functions are invoked without errors.
Ensure that you have valid API keys if your endpoints are protected by API Gateway.

8. Security Considerations

API Key Protection: If your endpoints require an API key, note that storing it in the front-end can expose it to users. Consider a dedicated backend or usage plan.
IAM Roles: Ensure each Lambda has least-privilege permissions to DynamoDB and Personalize.
HTTPS: Enforce HTTPS (via API Gateway) to protect data in transit.

10. Contact / Contributing

Maintainer: Your Name (saiteja200052@gmail.com)
Contributions: Feel free to open issues or submit pull requests. For major changes, please discuss them in an issue first to ensure alignment with the project’s scope.


