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

        data = response.json['data']

        assert 1 == len(data)
        assert account.uid == data[0]['uid']
        assert account.name == data[0]['name']
        assert account.login == data[0]['login']
        assert account.password == data[0]['password']
        assert account.user == data[0]['user']


class TestShow:
    def test_return_status_200_when_account_exist(self, client):
        user = guid()

        account = Account(uid=guid(),
                          name='GITHUB',
                          login='flavio.fernandes6@gmail.com',
                          password='test123',
                          user=user)

        account.save()

        response = client.get(f'/accounts/{account.uid}')

        assert 200 == response.status_code

    def test_should_return_a_account_when_account_exist(self, client):
        user = guid()

        account = Account(uid=guid(),
                          name='GITHUB',
                          login='flavio.fernandes6@gmail.com',
                          password='test123',
                          user=user)

        account.save()

        response = client.get(f'/accounts/{account.uid}')

        data = response.json['data']

        assert account.uid == data['uid']
        assert account.name == data['name']
        assert account.login == data['login']
        assert account.password == data['password']
        assert account.user == data['user']


class TestEdit:
    def test_should_return_status_200_when_edit_account(self, client):
        user = guid()

        account = Account(uid=guid(),
                          name='GITHUB',
                          login='flavio.fernandes6@gmail.com',
                          password='test123',
                          user=user)

        account.save()

        data = {
            'name': 'MICROSOFT',
            'login': 'flaviogf6@outlook.com',
            'password': '123test'
        }

        response = client.put(f'/accounts/{account.uid}', json=data)

        assert 200 == response.status_code

    def test_should_update_database_when_edit_a_account(self, client):
        user = guid()

        account = Account(uid=guid(),
                          name='GITHUB',
                          login='flavio.fernandes6@gmail.com',
                          password='test123',
                          user=user)

        account.save()

        data = {
            'name': 'MICROSOFT',
            'login': 'flaviogf6@outlook.com',
            'password': '123test'
        }

        client.put(f'/accounts/{account.uid}', json=data)

        account.reload()

        assert account.name == 'MICROSOFT'
        assert account.login == 'flaviogf6@outlook.com'
        assert account.password == '123test'


class TestDestroy:
    def test_should_return_status_200_when_destroy_a_account(self, client):
        user = guid()

        account = Account(uid=guid(),
                          name='GITHUB',
                          login='flavio.fernandes6@gmail.com',
                          password='test123',
                          user=user)

        account.save()

        response = client.delete(f'/accounts/{account.uid}')

        assert 200 == response.status_code

    def test_should_delete_account_on_database_when_destroy_a_account(self, client):
        user = guid()

        account = Account(uid=guid(),
                          name='GITHUB',
                          login='flavio.fernandes6@gmail.com',
                          password='test123',
                          user=user)

        account.save()

        client.delete(f'/accounts/{account.uid}')

        assert 0 == len(Account.objects)
