from django.contrib import admin
from chats.models import Room, Messages

# Register your models here.
admin.site.register(Room)
admin.site.register(Messages)