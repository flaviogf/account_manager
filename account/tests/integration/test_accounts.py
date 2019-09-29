from account.models import Account


class TestStore:
    def test_should_return_status_201_when_account_is_created(self, client):
        data = {
            'name': 'GITHUB',
            'login': 'flavio.fernandes6@gmail.com',
            'password': 'test123'
        }

        response = client.post('/accounts', json=data)

        assert 201 == response.status_code

    def test_should_add_account_on_database_when_account_is_created(self, client):
        data = {
            'name': 'GITHUB',
            'login': 'flavio.fernandes6@gmail.com',
            'password': 'test123'
        }

        client.post('/accounts', json=data)

        account = Account.objects.first()

        assert 1 == len(Account.objects)
        assert 'GITHUB' == account.name
        assert 'flavio.fernandes6@gmail.com' == account.login
        assert 'test123' == account.password
