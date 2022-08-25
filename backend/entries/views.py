from django.shortcuts import render

from .serializers import *
from .models import *
from rest_framework import viewsets, permissions,generics,mixins

# Create your views here.


class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        # after get all products on DB it will be filtered by its owner and return the queryset
        user_queryset = self.queryset.filter(user=self.request.user)
        return user_queryset    

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = (permissions.AllowAny,)
class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = (permissions.AllowAny,)
