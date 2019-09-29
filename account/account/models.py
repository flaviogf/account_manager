from account.extensions import db


class Account(db.Document):
    name = db.StringField(required=True)
    login = db.StringField(required=True)
    password = db.StringField(required=True)
