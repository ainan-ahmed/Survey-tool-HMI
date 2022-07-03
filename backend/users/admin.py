from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model


class CustomUserAdmin(UserAdmin):
    # controls the fields to be listed in django admin
    list_display = ['id','username', 'first_name',
                    'last_name', 'email', 'date_of_birth','gender']


admin.site.register(get_user_model(), CustomUserAdmin)