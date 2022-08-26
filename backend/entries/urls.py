from .views import *
from rest_framework.routers import DefaultRouter
from django.urls import path,include
router = DefaultRouter()
router.register('',EntryViewSet,basename="entry")
# router.register('answers',AnswerViewSet,basename="answer")

urlpatterns = [
    path('answers/',AnswerViewSet.as_view({'post':'create'})),
    path('answers/<pk>/', AnswerViewSet.as_view({'put': 'update', 'delete': 'destroy'})),
    path('', include(router.urls)),
    ]

# urlpatterns = router.urls