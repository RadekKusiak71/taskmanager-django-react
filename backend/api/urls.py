from django.urls import path
from . import views

urlpatterns = [
    path('',views.getOverview),
    path('tasks/<int:user_id>/',views.getTasks),
    path('register/',views.registerAuth),
    path('login/',views.loginAuth),
    path('taskStatus',views.changeStatus),
]