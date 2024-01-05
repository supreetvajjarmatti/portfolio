from django.urls import path 
from .views import success_page, index, contact

urlpatterns = [
    path('',index,name='index'),
    path('/contact',contact, name='contact'),
    path('/success',success_page, name='success_page'),

]
