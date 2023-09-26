from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.models import User

from .models import Task, Profile
from .serializers import TaskSerializer, ProfileSerializer


@api_view(['GET'])
def getOverview(request):
    data = {
        'api state': True
    }
    return Response(data)


@api_view(['GET'])
def getTasks(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        profile = Profile.objects.get(user=user)
        tasks = Task.objects.filter(profile=profile)

        if tasks.exists():
            tasks_serialized = TaskSerializer(tasks, many=True)
            return Response(tasks_serialized.data)
        else:
            return Response({'message': 'You dont have any tasks...'}, status=status.HTTP_404_NOT_FOUND)

    except User.DoesNotExist:
        return Response({'message': 'User not found...'}, status=status.HTTP_404_NOT_FOUND)

    except Profile.DoesNotExist:
        return Response({'message': 'Profile not found...'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def createTask(request, profile_id):
    if request.method == 'POST':
        try:
            profile = Profile.objects.get(id=profile_id)
            title = request.data.get('title')
            body = request.data.get('body')
            if all([title, body]):
                Task.objects.create(title=title, body=body, profile=profile)
                return Response({'message': 'Task created successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Both title and body are required'}, status=status.HTTP_400_BAD_REQUEST)
        except Profile.DoesNotExist:
            return Response({'message': 'Your profile doesn\'t exist anymore...'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'Invalid request method. This API endpoint only supports POST requests.'}, status=status.HTTP_400_BAD_REQUEST)
