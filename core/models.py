from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class LikedSong(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='liked_songs')
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    image = models.CharField(max_length=500, null=True, blank=True)
    audio = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.title} by {self.artist}"
