from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import LikedSong
import json

def home(request):
    return render(request, 'home.html')

@login_required
def library(request):
    liked_songs = LikedSong.objects.filter(user=request.user)
    return render(request, 'library.html', {'liked_songs': liked_songs})

def moods(request):
    return render(request, 'moods.html')

def groovepad(request):
    return render(request, 'groovepad.html')

@login_required
@require_POST
def like_song(request):
    data = json.loads(request.body)
    title = data.get('title')
    artist = data.get('artist')
    image = data.get('image')
    audio = data.get('audio')

    # Check if song already liked
    if LikedSong.objects.filter(user=request.user, title=title).exists():
        return JsonResponse({'message': 'Song already liked'}, status=200)

    # Create new liked song
    LikedSong.objects.create(
        user=request.user,
        title=title,
        artist=artist,
        image=image,
        audio=audio
    )

    return JsonResponse({'message': 'Song liked successfully'}, status=201)

@login_required
def get_liked_songs(request):
    liked_songs = LikedSong.objects.filter(user=request.user)
    songs_list = [{
        'title': song.title,
        'artist': song.artist,
        'image': song.image,
        'audio': song.audio
    } for song in liked_songs]
    
    return JsonResponse(songs_list, safe=False)
