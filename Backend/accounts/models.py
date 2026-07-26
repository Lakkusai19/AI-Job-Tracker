from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    skills = models.TextField(blank=True)
    experience = models.TextField(blank=True)
    resume_summary = models.TextField(blank=True)

    def __str__(self):
        return self.user.username