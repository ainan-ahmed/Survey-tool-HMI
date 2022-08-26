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
        return self.description



class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.TextField(max_length=500)
    survey = models.ForeignKey(
    Survey, on_delete=models.CASCADE, related_name='questions')
    date_created = models.DateTimeField(auto_now_add=True)