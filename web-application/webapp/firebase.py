import json

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

    def reservation_new(self, data, notification_title='', notification_body='', devices_ids=[]):
        self._post(namespace='/reservation/new', data=data)
        return self._send_notification(notification_title, notification_body, devices_ids=devices_ids)

    def reservation_changed(self, data, notification_title='', notification_body='', devices_ids=[]):
        self._post(namespace='/reservation/changed', data=data)
        return self._send_notification(notification_title, notification_body, devices_ids=devices_ids)

    def _send_notification(self, title, body, devices_ids):
        notification = FCMNotification(api_key=self.fcm_key)
        payload = {
            'priority': 'high',
            'registration_ids': devices_ids,
            'content_available': True,
            'notification': {
                'title': title,
                'body': body,
                'sound': 'default',
                'click_action': 'mynotes'
            },
            'data': {
                'type': 'mynotes'
            }
        }

        return notification.do_request(payload=json.dumps(payload), timeout=4000)