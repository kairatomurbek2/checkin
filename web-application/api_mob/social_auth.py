from allauth.socialaccount.helpers import complete_social_login
from allauth.socialaccount.models import SocialApp, SocialToken, SocialLogin, SocialAccount
from allauth.socialaccount.providers.facebook.views import fb_complete_login
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from django.contrib.auth.models import User
from django.http import JsonResponse
from requests import HTTPError
from rest_framework.authtoken.models import Token


class SocialAuth(object):
    def __init__(self, provider, token_key):
        self.provider = provider
        self.token_key = token_key

    def login(self, request):
        try:
            original_request = request._request
            token = request.POST.get(self.token_key, '')

            google_auth_adapter = GoogleOAuth2Adapter(request=original_request)

            app = SocialApp.objects.get(provider=self.provider)
            social_auth_token = SocialToken(app=app, token=token)
            login = google_auth_adapter.complete_login(request=original_request, app=app, token=social_auth_token) \
                if self.provider is 'google' else fb_complete_login(request=request, app=app, token=social_auth_token)

            extra_data = login.account.extra_data
            json_error_response = None

            if 'email' not in extra_data:
                json_error_response = JsonResponse(dict(message='email is not provided'), status=400)

            if json_error_response is not None:
                return json_error_response

            user = User.objects.filter(email=extra_data['email']).first()

            if user is not None:
                token, is_created = Token.objects.get_or_create(user=user)
                return JsonResponse(dict(key=token.key))

            login.token = social_auth_token
            login.state = SocialLogin.state_from_request(original_request)

            complete_social_login(original_request, login)
            token, is_created = Token.objects.get_or_create(user=original_request.user)

            return JsonResponse(dict(key=token.key))
        except HTTPError as e:
            return JsonResponse(dict(message=str(e)), status=400)