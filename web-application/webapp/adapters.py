from django.conf import settings
from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from rest_framework.authtoken.models import Token


class AccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request):
        return getattr(settings, 'ACCOUNT_ALLOW_REGISTRATION', True)

    def get_login_redirect_url(self, request):
        path = "/"
        return path

    def login(self, request, user):
        super(AccountAdapter, self).login(request, user)
        token, created = Token.objects.get_or_create(user=request.user)
        request.session['token_key'] = token.key


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request, sociallogin):
        return getattr(settings, 'ACCOUNT_ALLOW_REGISTRATION', True)

    def get_login_redirect_url(self, request):
        path = "/"
        return path
