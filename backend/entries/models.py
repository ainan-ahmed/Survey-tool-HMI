from operator import mod
from django.db import models
import uuid
from surveys.models import *
# Create your models here.
from django.contrib.auth import get_user_model

class Entry(models.Model):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female')
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.TextField(max_length=500, blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    survey = models.ForeignKey(Survey,on_delete=models.CASCADE,related_name="entries")
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(verbose_name='email address',
        max_length=255,
        unique=False,)
    gender = models.CharField(
    max_length=20, choices=GENDER_CHOICES, default='male')
    class Meta:
        ordering = ['-date_created']
    def __str__(self):
        return self.description

class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.TextField(max_length=500,blank=True,null=True)
    survey = models.ForeignKey(
    Survey, on_delete=models.CASCADE, related_name='questions')
    date_created = models.DateTimeField(auto_now_add=True)


class Answer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    Question = models.OneToOneField(Question,on_delete=models.CASCADE,related_name="answer")
    answer = models.TextField(max_length=500, blank=True, null=True)
    entry = models.ForeignKey(Entry,on_delete=models.CASCADE,related_name="answers");
