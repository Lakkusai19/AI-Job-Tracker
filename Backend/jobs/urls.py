from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet
from .dashboard import dashboard_stats

router = DefaultRouter()
router.register(r"", JobViewSet, basename="jobs")

urlpatterns = [
    path("dashboard/", dashboard_stats),
    path("", include(router.urls)),
]