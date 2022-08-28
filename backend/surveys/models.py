from tkinter import BUTT
from django.db import models
import uuid
# Create your models here.
from django.contrib.auth import get_user_model

class Survey(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.TextField(max_length=500)
    description = models.TextField(max_length=500, blank=True, null=True)
    created_by = models.ForeignKey(
    get_user_model(), on_delete=models.CASCADE, related_name='surveys')
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_created']
    def __str__(self):
        return self.title or ''



class Question(models.Model):
    BUTTON_CHOICES = [
    ('text', 'Text'),
    ('number', 'Number'),
    ('likertScale', 'Likert Scale'),
    ('radioButton', 'Radio Button'),
    ('checkboxes', 'Check Boxes'),
    ('dropdown', 'Dropdown'),
]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.TextField(max_length=500)
    survey = models.ForeignKey(
    Survey, on_delete=models.CASCADE, related_name='questions')
    button = models.CharField(max_length=50,choices=BUTTON_CHOICES)
    choice1 = models.CharField(max_length=50) 
    choice2 = models.CharField(max_length=50) 
    choice3 = models.CharField(max_length=50,null=True,blank=True) 
    choice4 = models.CharField(max_length=50,null=True,blank=True) 
    choice5 = models.CharField(max_length=50,null=True,blank=True) 
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or ''