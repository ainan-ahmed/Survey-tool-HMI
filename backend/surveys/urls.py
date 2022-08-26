from .views import *
from rest_framework.routers import DefaultRouter
from django.urls import path,include
router = DefaultRouter()
router.register('',SurveyViewSet,basename="survey")
# router.register('questions',QuestionViewSet,basename="question")

urlpatterns = [
    path('questions/',QuestionViewSet.as_view({'post':'create'})),
    path('questions/<pk>/', QuestionViewSet.as_view({'put': 'update', 'delete': 'destroy'})),
    path('', include(router.urls)),
    ]
# urlpatterns = router.urls