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
