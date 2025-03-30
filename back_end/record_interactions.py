import json
import boto3
import time
import uuid
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('user_interactions')
personalize_events = boto3.client('personalize-events')

def lambda_handler(event, context):
    try:
        print(f"Raw event: {event}")
        body = json.loads(event['body'])
        user_id = body['user_id']
        event_type = body['event_type']
        item_id = body.get('item_id')
        
        event_timestamp = int(time.time())
        event_id = str(uuid.uuid4())
        
        item = {
            'user_id': user_id,
            'event_timestamp': event_timestamp,
            'event_id': event_id,
            'event_type': event_type,
            'item_id': item_id,
            'processed': False
        }
        
        print("DynamoDB item:", item)
        table.put_item(Item=item)
        
        if item_id:
            # Convert Unix timestamp to ISO 8601 without pytz
            sent_at = datetime.utcfromtimestamp(event_timestamp).isoformat() + 'Z'
            print(f"Sending to Personalize - userId: {user_id}, itemId: {item_id}, eventType: {event_type}, sentAt: {sent_at}")
            personalize_events.put_events(
                trackingId='fea016e7-2805-4ba8-bdf3-f9f5847e9967',
                userId=user_id,
                sessionId=f"session_{user_id}",
                eventList=[{
                    'eventType': event_type,
                    'itemId': item_id,
                    'sentAt': sent_at
                }]
            )
            print("Personalize event sent successfully")
        else:
            print("Warning: item_id missing; skipping Personalize event.")
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': 'http://recommenderapp.s3-website.ca-central-1.amazonaws.com',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({'message': 'Interaction recorded', 'event_id': event_id})
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }
