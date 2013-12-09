from framework import StoredObject, fields


class Guid(StoredObject):

    _id = fields.StringField()
    referent = fields.AbstractForeignField(backref='guid')

    _meta = {
        'optimistic': True
    }


class GuidStoredObject(StoredObject):

    def _ensure_guid(self):
        """Create GUID record if current record doesn't already have one, then
        point GUID to self.

        """
        # Create GUID with specified ID if ID provided
        if self._primary_key:

            # Done if GUID already exists
            guid = Guid.load(self._primary_key)
            if guid is not None:
                return

            # Create GUID
            guid = Guid(
                _id=self._primary_key,
                referent=self
            )
            guid.save()

        # Else create GUID optimistically
        else:

            # Create GUID
            guid = Guid()
            guid.save()
            guid.referent = (guid._primary_key, self._name)
            guid.save()

            # Set primary key to GUID key
            self._primary_key = guid._primary_key

    def __init__(self, *args, **kwargs):
        """ Ensure GUID after initialization. """
        super(GuidStoredObject, self).__init__(*args, **kwargs)
        self._ensure_guid()

    @property
    def annotations(self):
        """ Get meta-data annotations associated with object. """
        return self.metadata__annotated
