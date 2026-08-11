const supabase = require('../lib/supabase')

const BookController = {
  list: async (req, res) => {
    try {
      const { data: books, error } = await supabase.from('Book').select('*').order('id', { ascending: true })
      if (error) throw error
      res.json(books)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  create: async (req, res) => {
    try {
      const { data: book, error } = await supabase.from('Book').insert([
        { name: req.body.name, price: req.body.price }
      ]).select().single()
      if (error) throw error
      res.json({ book })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  update: async (req, res) => {
    try {
      const { data: book, error } = await supabase.from('Book').update({
        name: req.body.name,
        price: req.body.price
      }).eq('id', parseInt(req.params.id)).select().single()
      if (error) throw error
      res.json(book)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  delete: async (req, res) => {
    try {
      const { error } = await supabase.from('Book').delete().eq('id', parseInt(req.params.id))
      if (error) throw error
      res.json({ message: 'success' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

module.exports = BookController;
