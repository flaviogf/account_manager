from flask import Blueprint, request

from account.models import Account

blueprint = Blueprint('accounts', __name__, url_prefix='/accounts')


@blueprint.route('', methods=['POST'])
def store():
    body = request.json

    account = Account(name=body['name'],
                      login=body['login'],
                      password=body['password'])

    account.save()

    return '', 201
