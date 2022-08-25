from django.shortcuts import render

from .serializers import *
from .models import *
from rest_framework import viewsets, permissions,generics,mixins

# Create your views here.


class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    permission_classes = (permissions.IsAuthenticated,  )

    def get_queryset(self):
        # after get all products on DB it will be filtered by its owner and return the queryset
        user_queryset = self.queryset.filter(user=self.request.user)
        return user_queryset    


