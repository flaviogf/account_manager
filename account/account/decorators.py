from functools import wraps

from flask import request

from account.services import identity


def authorize():
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            token = request.headers.get('authorization')

            claims = identity.decode(token)

            request.user = claims

            result = fn(*args, **kwargs)

            return result
        return wrapper
    return decorator
