from dynaconf import settings


class Config:
    IDENTITY_URL = settings.IDENTITY_URL
    MONGODB_DB = settings.MONGODB_DB
    MONGODB_HOST = settings.MONGODB_HOST
    MONGODB_PORT = settings.MONGODB_PORT
    MONGODB_USERNAME = settings.MONGODB_USERNAME
    MONGODB_PASSWORD = settings.MONGODB_PASSWORD


class Production(Config):
    ...


class Testing(Config):
    ...
