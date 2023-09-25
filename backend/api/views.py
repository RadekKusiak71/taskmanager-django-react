from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET'])
def getOverview(request):
    data = {
        'api state': True
    }
    return Response(data)