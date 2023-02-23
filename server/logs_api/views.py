from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Log
from .serializer import LogSerializer
from .utils import (
    getOverviewData,
    getAnnualData,
    getSeverityData
)
from .exceptions import (
    LogDataInvalid,
    LogDoesNotExist,
    LogAlreadyExists
)


class LogListing(APIView):
    def get(self, request):
        """
        Endpoint to get all the logs.

        Returns:
        --------
        response:
            - success: Response (Rest Framework) containing the logs
            - failure: Response (Rest Framework) containing a error message
        """
        
        try:
            logs = Log.objects.all()
            serializer = LogSerializer(logs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({ 'message': str(e) }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self, request):
        """
        Endpoint to delete all the logs.

        Returns:
        --------
        response:
            - success: Response (Rest Framework) containing a success message
            - failure: Response (Rest Framework) containing a error message
        """

        try:
            Log.objects.all().delete()
            return Response({ 'message': 'All logs deleted' }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({ 'message': str(e) }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateLog(APIView):
    def post(self, request):
        """
        Endpoint to create a log.

        Returns:
        --------
        response:
            - success: Response (Rest Framework) containing the log object created
            - failure: Response (Rest Framework) containing an appropriate error message
        """

        try:
            serializer = LogSerializer(data=request.data)

            if not serializer.is_valid():
                if 'timestamp' in serializer.errors or 'severity' in serializer.errors or 'source' in serializer.errors or 'message' in serializer.errors:
                    raise LogDataInvalid(serializer.errors)
                else:
                   raise LogAlreadyExists(serializer.errors)
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except LogDataInvalid as e:
            return Response({ 'message': str(e) }, status=status.HTTP_400_BAD_REQUEST)
        
        except LogAlreadyExists as e:
            return Response({ 'message': str(e) }, status=status.HTTP_409_CONFLICT)


class LogDetail(APIView):
    def get(self, request, id):
        """
        Endpoint to get a log by id.

        Inputs:
        -------
        request:
            - id: id of the log to be fetched

        Returns:
        --------
        response:
            - success: Response (Rest Framework) containing the log object
            - failure: Response (Rest Framework) containing an appropriate error message
        """

        try:
            log = Log.objects.get(pk=id)
            serializer = LogSerializer(log)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except LogDoesNotExist as e:
            return Response({ 'message': str(e) }, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        """
        Endpoint to update a log by id.

        Inputs:
        -------
        request:
            - data: data to update the log with

        Returns:
        --------
        response:
            - success: Response (Rest Framework) containing the log object updated
            - failure: Response (Rest Framework) containing an appropriate error message
        """

        try:
            log = Log.objects.get(pk=id)
            serializer = LogSerializer(log, data=request.data)

            if not serializer.is_valid():
                raise LogDataInvalid(serializer.errors)
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except LogDataInvalid as e:
            return Response({ 'message': str(e) }, status=status.HTTP_400_BAD_REQUEST)
        
        except LogDoesNotExist as e:
            return Response({ 'message': str(e) }, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        """
        Endpoint to delete a log by id.

        Inputs:
        -------
        request:
            - id: id of the log to be deleted

        Returns:
        --------
        response:
            - success: Response (Rest Framework) containing a success message
            - failure: Response (Rest Framework) containing an appropriate error message
        """

        try:
            log = Log.objects.get(pk=id)
            log.delete()
            return Response({ 'message': f'Log with id {id} deleted' }, status=status.HTTP_200_OK)
        
        except LogDoesNotExist as e:
            return Response({ 'message': str(e) }, status=status.HTTP_404_NOT_FOUND)


class SearchLogs(APIView):
    def post(self, request):
        """
        Endpoint to search logs by any of the following parameters:
            - If the request data contains 'date_from', then filter the logs by timestamp greater than or equal to it
            - If the request data contains 'date_to', then filter the logs by timestamp less than or equal to it
            - If the request data contains any other key ('severity', 'source', etc.), then filter the logs by that key and its value
        
        Inputs:
        -------
        request:
            - data: data to filter the logs with
                - date_from?: timestamp greater than or equal to this value
                - date_to?: timestamp less than or equal to this value
                - severity?: severity of the log
                - source?: source of the log
        
        ? denotes optional

        Returns:
        --------
        response:
            - success: Response (Rest Framework) containing the logs
            - failure: Response (Rest Framework) containing an appropriate error message
        """

        try:
            filters = {}

            for search_param, search_value in request.data.items():
                if search_param == 'date_from' and search_value != '':
                    filters['timestamp__gte'] = search_value
                
                if search_param == 'date_to' and search_value != '':
                    filters['timestamp__lte'] = search_value
                
                if search_param == 'severity' and search_value != 0:
                    filters[search_param] = search_value
                
                if search_param == 'source' and search_value != '':
                    filters[search_param] = search_value

            logs = Log.objects.filter(**filters)

            serializer = LogSerializer(logs, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({ 'message': str(e) }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AggregateLogs(APIView):
    def get(self, request):
        """
        Endpoint to aggregate the logs by:
            - Overview Data: total number of logs created daily, weekly, and monthly
            - Annual Data: total number of logs created per day in the year
            - Severity Data: total number of logs per severity
        
        Returns:
        --------
        response:
            - success: Response (Rest Framework) containing the aggregated data
            - failure: Response (Rest Framework) containing an appropriate error message
        """

        try:
            logs = Log.objects.all()

            data = {}
            
            # part 1: Overview Data
            data['overview_data'] = getOverviewData(logs) # add the overview data to the data object

            # part 2: Annual Data
            data['annual_data'] = getAnnualData(logs) # add the annual data to the data object

            # part 3: Severity Data
            data['severity_data'] = getSeverityData(logs) # add the severity data to the data object

            return Response(data)
        except Exception as e:
            return Response({ 'message': str(e) })
