from rest_framework.test import APITestCase
from rest_framework import status
from .models import Log


class LogsApiTestCase(APITestCase):
    def setUp(self):
        self.log = Log.objects.create(
            severity=1,
            message="Test message",
            source="Test source",
            timestamp="2020-09-01T00:00:00Z"
        )

    def test_get_logs(self):
        """
        Endpoint: /api/logs/
        Method: GET
        Description: Testing the endpoint to get all the logs
        """

        _response = self.client.get('/api/logs/')
        _response_data = _response.json()

        self.assertEqual(_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(_response_data), 1)
    
    def test_delete_logs(self):
        """
        Endpoint: /api/logs/
        Method: DELETE
        Description: Testing the endpoint to delete all the logs
        """

        _response = self.client.delete('/api/logs/')
        _response_data = _response.json()

        self.assertEqual(_response.status_code, status.HTTP_200_OK)
        self.assertEqual(_response_data['message'], "All logs deleted")
    
    def test_create_log(self):
        """
        Endpoint: /api/log/
        Method: POST
        Description: Testing the endpoint to create a log
        """

        _data = {
            "severity": 1,
            "message": "Test message",
            "source": "Test source",
            "timestamp": "2020-09-01T00:00:00Z"
        }

        _response = self.client.post('/api/log/', _data)
        _response_data = _response.json()

        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(_response_data['severity'], _data['severity'])
        self.assertEqual(_response_data['message'], _data['message'])
        self.assertEqual(_response_data['source'], _data['source'])
        self.assertEqual(_response_data['timestamp'], _data['timestamp'])
    
    def test_create_log_inavlid_data(self):
        """
        Endpoint: /api/log/
        Method: POST
        Description: Testing the endpoint to return an error when the data is invalid
        """

        _data = {
            "severity": 1,
            "source": "Test source",
            "timestamp": "2020-09-01T00:00:00Z"
        }

        _response = self.client.post('/api/log/', _data)
        _response_data = _response.json()

        self.assertEqual(_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(_response_data['message'], "Invalid message: This field is required.")
