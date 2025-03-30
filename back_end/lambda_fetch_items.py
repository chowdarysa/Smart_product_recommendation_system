# Lambda: get_items.py
import json
import boto3

dynamodb = boto3.resource('dynamodb')
items_table = dynamodb.Table('Items')

def lambda_handler(event, context):
    try:
        # For simplicity, we're scanning the entire table.
        # In production, consider using Query operations with filters and pagination.
        response = items_table.scan(Limit=60)
        items = response.get('Items', [])
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': 'http://recommenderapp.s3-website.ca-central-1.amazonaws.com',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,GET'
            },
            'body': json.dumps({'items': items})
        }
    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }
