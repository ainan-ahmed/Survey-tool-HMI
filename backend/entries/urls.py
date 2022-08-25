from .views import *
from rest_framework.routers import DefaultRouter
from django.urls import path,include
router = DefaultRouter()
router.register('',EntryViewSet,basename="entry")
router.register('questions',QuestionViewSet,basename="question")
router.register('answers',AnswerViewSet,basename="answer")
#router.register('comments',CommentViewSet,basename="comments")

urlpatterns = router.urls