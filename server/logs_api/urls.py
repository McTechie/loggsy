from django.urls import path
from .views import (
    LogListing,
    CreateLog,
    LogDetail,
    SearchLogs,
    AggregateLogs,
)

urlpatterns = [
    path('logs/', LogListing.as_view()),
    path('log/', CreateLog.as_view()),
    path('log/<int:id>', LogDetail.as_view()),
    path('logs/search', SearchLogs.as_view()),
    path('logs/aggregate', AggregateLogs.as_view()),
]
