import pytest

from account import create_app
from account.database import db
from account.utils import guid


@pytest.fixture
def app():
    app = create_app('account.config.Testing')

    db_name = app.config.get('MONGODB_DB')

    with app.app_context():
        db.connection.drop_database(db_name)
        yield app
        db.connection.drop_database(db_name)


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def user(app):
    return dict(sub=guid.new_guid())


@pytest.fixture()
def authorize(app, requests_mock, user):
    url = app.config.get('IDENTITY_URL')
    url = f'{url}/decode'
    requests_mock.post(url, status_code=200, json=dict(data=user))
