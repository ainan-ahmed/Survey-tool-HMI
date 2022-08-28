
from django.contrib import admin
from .models import *
# Register your models here.


@admin.register(Survey)
class SurveyAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description','created_by' ,'date_created')


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'survey','button','choice1','choice2','choice3','choice4','choice5','date_created')