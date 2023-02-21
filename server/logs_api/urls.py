from django.urls import path
from .views import (
    LogListing,
    CreateLog,
)

urlpatterns = [
    path('logs/', LogListing.as_view()),
    path('log/', CreateLog.as_view()),
]
