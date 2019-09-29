import uuid


class Guid:
    def new_guid(self):
        return str(uuid.uuid4()).replace('-', '').upper()


guid = Guid()
