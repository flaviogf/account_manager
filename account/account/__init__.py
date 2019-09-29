from flask import Flask


def create_app(config):
    app = Flask(__name__)

    app.config.from_object(config)

    from account.extensions import db
    db.init_app(app)

    from account import accounts
    app.register_blueprint(accounts.views.blueprint)

    return app
