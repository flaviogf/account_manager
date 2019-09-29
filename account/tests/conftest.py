import pytest

from account import create_app
from account.extensions import db


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
