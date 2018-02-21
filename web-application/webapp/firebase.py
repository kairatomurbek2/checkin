from firebase import firebase


class FirebaseHelper(object):

    def __init__(self, firebase_url, firebase_secret, firebase_email):
        self.auth = firebase.FirebaseAuthentication(secret=firebase_secret,
                                                    email=firebase_email)
        self.firebase_obj = firebase.FirebaseApplication(dsn=firebase_url, authentication=self.auth)

    def _post(self, namespace, data):
        return self.firebase_obj.post(namespace, data)

    def reservation_new(self, data):
        return self._post(namespace='/reservation/new', data=data)

    def reservation_changed(self, data):
        return self._post(namespace='/reservation/changed', data=data)