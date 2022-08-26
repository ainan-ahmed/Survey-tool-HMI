from rest_framework import serializers
from .models import *

class AnswerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Answer
        fields = '__all__'

class EntrySerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    class Meta:
        model = Entry
        fields = ['id','survey','first_name','last_name','email','gender','answers']
        
