from rest_framework.serializers import ModelSerializer
from .models import Task,Profile

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class ProfileSerializer(ModelSerializer):
    class Meta:
        model=Profile
        fields = '__all__'