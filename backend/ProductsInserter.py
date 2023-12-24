import ydb

def blocking_query(session, query):
  return session.transaction().execute(
    query,
    commit_tx = True,
    settings = ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2)
  )

class ProductsInserter: # end this
  data: str

  def insert_products(self, session):
    query = 'INSERT INTO products (id, amount, product_name_id, store_id) ' + self.data
    return blocking_query(session, query)

  def get_max_id(self, session):
    return blocking_query(session, 'SELECT MAX(id) as id FROM products')

  def set_data(self, data):
    self.data = data
  
  def get_data(self):
    return self.data

inserter = ProductsInserter()