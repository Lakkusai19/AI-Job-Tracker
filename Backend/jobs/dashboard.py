from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Job


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    jobs = Job.objects.filter(user=request.user)

    data = {
        "total_jobs": jobs.count(),
        "applied": jobs.filter(status="Applied").count(),
        "interview": jobs.filter(status="Interview").count(),
        "offer": jobs.filter(status="Offer").count(),
        "rejected": jobs.filter(status="Rejected").count(),
    }

    return Response(data)