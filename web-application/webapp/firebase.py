from firebase import firebase
from pyfcm import FCMNotification


class FirebaseHelper(object):

    def __init__(self, firebase_url, firebase_secret, firebase_email, fcm_key):
        self.auth = firebase.FirebaseAuthentication(secret=firebase_secret,
                                                    email=firebase_email)
        self.firebase_obj = firebase.FirebaseApplication(dsn=firebase_url, authentication=self.auth)
        self.fcm_key = fcm_key

    def _post(self, namespace, data):
        return self.firebase_obj.post(namespace, data)

    def reservation_new(self, data, notification_title='', notification_body=''):
        self._post(namespace='/reservation/new', data=data)
        return self._send_notification(notification_title, notification_body)

    def reservation_changed(self, data, notification_title='', notification_body=''):
        self._post(namespace='/reservation/changed', data=data)
        return self._send_notification(notification_title, notification_body)

    def _send_notification(self, title, body):
        notification = FCMNotification(api_key=self.fcm_key)
        return notification.notify_topic_subscribers(topic_name="reservations", message_title=title, message_body=body)