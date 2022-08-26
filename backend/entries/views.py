from django.shortcuts import render

from .serializers import *
from .models import *
from rest_framework import viewsets, permissions,generics,mixins

# Create your views here.


class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    permission_classes = (permissions.AllowAny, ) 



class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = (permissions.AllowAny,)
