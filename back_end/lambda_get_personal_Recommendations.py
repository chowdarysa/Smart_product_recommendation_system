import json
import boto3

personalize_runtime = boto3.client('personalize-runtime')

def lambda_handler(event, context):
    try:
        params = event.get('queryStringParameters', {})
        user_id = params.get('user_id')
        if not user_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'user_id parameter is required'})
            }
        
        response = personalize_runtime.get_recommendations(
            campaignArn='arn:aws:personalize:ca-central-1:654654370440:campaign/recommender',  # Replace with your campaign ARN
            userId=user_id,
            numResults=10
        )
        
        recommendations = response.get('itemList', [])
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': 'http://recommenderapp.s3-website.ca-central-1.amazonaws.com',  # or '*'
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            'body': json.dumps({'recommendations': recommendations})
        }
        
    except Exception as e:
        return {
            'statusCode': 408,
            'body': json.dumps({'error': str(e)})
        }
