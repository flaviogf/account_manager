import requests


class Identity:
    def init_app(self, app):
        self._base_url = app.config.get('IDENTITY_URL')
        self._session = requests.session()

    def decode(self, token):
        url = f'{self._base_url}/decode'

        response = self._session.post(url, json=dict(token=token))

        response.raise_for_status()

        return response.json()['data']


identity = Identity()
