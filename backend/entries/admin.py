
from django.contrib import admin
from .models import *
# Register your models here.


@admin.register(Entry)
class EntryAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'date_created','survey' ,'first_name','last_name','email','gender')


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('id', 'question','answer','entry')