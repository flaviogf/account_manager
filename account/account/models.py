from account.extensions import db


class Account(db.Document):
    uid = db.StringField(required=True)
    name = db.StringField(required=True)
    login = db.StringField(required=True)
    password = db.StringField(required=True)
    user = db.StringField(required=True)

    def to_dict(self):
        return dict(uid=self.uid,
                    name=self.name,
                    login=self.login,
                    password=self.password,
                    user=self.user)
