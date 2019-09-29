class Config:
    ...


class Production(Config):
    ...


class Testing(Config):
    MONGODB_DB = 'test_accounts'
    MONGODB_HOST = '192.168.100.10'
    MONGODB_PORT = 27017
    MONGODB_USERNAME = ''
    MONGODB_PASSWORD = ''
