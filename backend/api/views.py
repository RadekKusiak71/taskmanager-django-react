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


@api_view(['POST'])
def registerAuth(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        password_confirm = request.data.get('password_confirm')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')

        if not all([username, first_name, last_name, password, password_confirm]):
            return Response({'message': 'All inputs are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if len(username) < 8:
            return Response({'message': 'Username must be 8 characters or more.'}, status=status.HTTP_400_BAD_REQUEST)

        if password != password_confirm:
            return Response({'message': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'message': 'Username is already in use.'}, status=status.HTTP_409_CONFLICT)

        user = User.objects.create_user(
            username=username, password=password, first_name=first_name, last_name=last_name)
        profile = Profile.objects.create(
            user=user, first_name=first_name, last_name=last_name)

        return Response({'message': 'Registration successful.'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'Invalid request method. This API endpoint only supports POST requests.'}, status=status.HTTP_400_BAD_REQUEST)
