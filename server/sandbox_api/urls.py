from django.urls import path
from .views import (
    Entrypoint,
)

urlpatterns = [
    path("", Entrypoint.as_view()),
]
