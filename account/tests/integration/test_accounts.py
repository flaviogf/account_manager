from account.lib import guid
from account.models import Account


class TestStore:
    def test_should_return_status_201_when_account_is_created(self, client):
        user = guid()

        data = {
            'name': 'GITHUB',
            'login': 'flavio.fernandes6@gmail.com',
            'password': 'test123',
            'user': user
        }

        response = client.post('/accounts', json=data)

        assert 201 == response.status_code

    def test_should_add_account_on_database_when_account_is_created(self, client):
        user = guid()

        data = {
            'name': 'GITHUB',
            'login': 'flavio.fernandes6@gmail.com',
            'password': 'test123',
            'user': user
        }

        client.post('/accounts', json=data)

        account = Account.objects.first()

        assert 1 == len(Account.objects)
        assert account.uid
        assert 'GITHUB' == account.name
        assert 'flavio.fernandes6@gmail.com' == account.login
        assert 'test123' == account.password
        assert user == account.user


class TestIndex:
    def test_should_return_status_200(self, client):
        user = guid()

        account = Account(uid=guid(),
                          name='GITHUB',
                          login='flavio.fernandes6@gmail.com',
                          password='test123',
                          user=user)

        account.save()

        response = client.get('/accounts')

        assert 200 == response.status_code

    def test_should_return_a_list_of_accounts(self, client):
        user = guid()

        account = Account(uid=guid(),
                          name='GITHUB',
                          login='flavio.fernandes6@gmail.com',
                          password='test123',
                          user=user)

        account.save()

        response = client.get('/accounts')

        accounts = response.json['data']

        assert 1 == len(accounts)
        assert account.uid == accounts[0]['uid']
        assert account.name == accounts[0]['name']
        assert account.login == accounts[0]['login']
        assert account.password == accounts[0]['password']
        assert account.user == accounts[0]['user']
