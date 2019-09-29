from flask import Blueprint, jsonify, request

from account.decorators import authorize
from account.models import Account
from account.utils import guid

blueprint = Blueprint('accounts', __name__, url_prefix='/accounts')


@blueprint.route('', methods=['POST'])
@authorize()
def store():
    body = request.json

    user = request.user

    account = Account(uid=guid.new_guid(),
                      name=body['name'],
                      login=body['login'],
                      password=body['password'],
                      user=user['sub'])

    account.save()

    return jsonify({'data': account.uid, 'errors': []}), 201


@blueprint.route('', methods=['GET'])
@authorize()
def index():
    user = request.user

    accounts = [account.to_dict()
                for account in Account.objects(user=user['sub'])]

    return jsonify({'data': accounts,  'errors': []}), 200


@blueprint.route('<string:uid>', methods=['GET'])
@authorize()
def show(uid):
    user = request.user

    account = (Account.objects(uid=uid,
                               user=user['sub']).first())

    return jsonify({'data': account.to_dict(), 'errors': []}), 200


@blueprint.route('<string:uid>', methods=['PUT'])
@authorize()
def edit(uid):
    user = request.user

    account = (Account.objects(uid=uid,
                               user=user['sub']).first())

    body = request.json

    account.update(name=body['name'],
                   login=body['login'],
                   password=body['password'])

    return jsonify({'data': account.uid, 'errors': []}), 200


@blueprint.route('<string:uid>', methods=['DELETE'])
@authorize()
def destroy(uid):
    user = request.user

    account = (Account.objects(uid=uid,
                               user=user['sub']).first())

    account.delete()

    return jsonify({'data': None, 'errors': []}), 200
