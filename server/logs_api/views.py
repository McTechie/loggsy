from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Log
from .serializer import LogSerializer


class LogListing(APIView):
    def get(self, request):
        try:
            logs = Log.objects.all()
            serializer = LogSerializer(logs, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({ 'message': str(e) })
    
    def delete(self, request):
        try:
            Log.objects.all().delete()
            return Response({ 'message': 'All logs deleted' })
        except Exception as e:
            return Response({ 'message': str(e) })


class CreateLog(APIView):
    def post(self, request):
        try:
            serializer = LogSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response({ 'message': str(e) })


class LogDetail(APIView):
    def get(self, request, id):
        try:
            log = Log.objects.get(pk=id)
            serializer = LogSerializer(log)
            return Response(serializer.data)
        except Exception as e:
            return Response({ 'message': str(e) })

    def put(self, request, id):
        try:
            log = Log.objects.get(pk=id)
            serializer = LogSerializer(log, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as e:
            return Response({ 'message': str(e) })

    def delete(self, request, id):
        try:
            log = Log.objects.get(pk=id)
            log.delete()
            return Response({ 'message': 'Log deleted' })
        except Exception as e:
            return Response({ 'message': str(e) })


class SearchLogs(APIView):
    def get(self, request):
        try:
            filters = {}

            # Filters which can be applied:
            # If the request data contains 'date_from', then filter the logs by timestamp greater than or equal to it
            # If the request data contains 'date_to', then filter the logs by timestamp less than or equal to it
            # If the request data contains any other key ('severity', 'source', etc.), then filter the logs by that key and its value

            for search_param, search_value in request.data.items():
                if search_param == 'date_from':
                    filters['timestamp__gte'] = search_value
                elif search_param == 'date_to':
                    filters['timestamp__lte'] = search_value
                else:
                    filters[search_param] = search_value

            logs = Log.objects.filter(**filters)

            serializer = LogSerializer(logs, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({ 'message': str(e) })
