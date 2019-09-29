from flask import Blueprint, jsonify, request

from account.lib import guid
from account.models import Account

blueprint = Blueprint('accounts', __name__, url_prefix='/accounts')


@blueprint.route('', methods=['POST'])
def store():
    body = request.json

    account = Account(uid=guid(),
                      name=body['name'],
                      login=body['login'],
                      password=body['password'],
                      user=body['user'])

    account.save()

    return jsonify({'data': account.uid, 'errors': []}), 201


@blueprint.route('', methods=['GET'])
def index():
    accounts = [account.to_dict() for account in Account.objects]

    return jsonify({'data': accounts,  'errors': []}), 200


@blueprint.route('<string:uid>', methods=['GET'])
def show(uid):
    account = Account.objects(uid=uid).first()

    return jsonify({'data': account.to_dict(), 'errors': []}), 200


@blueprint.route('<string:uid>', methods=['PUT'])
def edit(uid):
    account = Account.objects(uid=uid).first()

    body = request.json

    account.update(name=body['name'],
                   login=body['login'],
                   password=body['password'])

    return jsonify({'data': account.uid, 'errors': []}), 200


@blueprint.route('<string:uid>', methods=['DELETE'])
def destroy(uid):
    account = Account.objects(uid=uid).first()

    account.delete()

    return jsonify({'data': None, 'errors': []}), 200
