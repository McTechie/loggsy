from django.urls import path
from .views import (
    LogListing,
    CreateLog,
    LogDetail,
)

urlpatterns = [
    path('logs/', LogListing.as_view()),
    path('log/', CreateLog.as_view()),
    path('log/<int:id>', LogDetail.as_view()),
]
