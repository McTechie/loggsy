from rest_framework.views import APIView
from rest_framework.response import Response

class Entrypoint(APIView):
    def get(self, request):
        return Response({ 'message': 'Welcome to Loggsy!' })
