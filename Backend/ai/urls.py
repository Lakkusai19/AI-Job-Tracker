from django.urls import path
from .views import generate_cover_letter

urlpatterns = [
    path("cover-letter/", generate_cover_letter, name="cover-letter"),
]