from rest_framework import serializers
from .models import *

class EntrySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Entry
        fields = '__all__'
        


class QuestionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Question
        fields = '__all__'
class AnswerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Answer
        fields = '__all__'