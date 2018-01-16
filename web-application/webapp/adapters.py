from django.conf import settings
from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from rest_framework.authtoken.models import Token
from webapp.models import Company


class AccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request):
        return getattr(settings, 'ACCOUNT_ALLOW_REGISTRATION', True)

    def get_login_redirect_url(self, request):
        try:
            company = Company.objects.get(user__user=request.user, user__administrator=True)
            path = '/companies/%s/masters/' % (company.slug)
            if company:
                return path
        except Company.DoesNotExist:
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
