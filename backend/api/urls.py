from django.urls import path
from . import views

urlpatterns = [
    path('',views.getOverview),
    path('task/<int:task_id>/',views.getTask),
    path('tasks/<int:user_id>/',views.getTasks),
    path('taskStatus/',views.changeStatus),
    path('createTask/',views.createTask),
    path('tasks/uncompleted/<int:profile_id>/',views.getUncompletedTasks),
    path('tasks/completed/<int:profile_id>/',views.getCompletedTasks),
    path('register/',views.registerAuth),
    path('login/',views.loginAuth),
]