 const FAKE_DB = {
  all: [{ id: 1234, name: 'Emi' }, { id: 5678, name: 'Ken' }],
  getById: (userId) => Promise.resolve(FAKE_DB.all.find(id => userId))
}

export default FAKE_DB;
