const supabase = require('../lib/supabase')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const TodoController = {
  create: async (req, res) => {
    try {
      const { name, remark } = req.body
      const token = req.headers['authorization'].replace('Bearer ', '')
      const secret_key = process.env.SECRET_KEY || "defaultSecretKey"
      const payload = jwt.verify(token, secret_key)
      const member_id = payload.id

      const { error } = await supabase.from('Todo').insert([
        {
          name: name,
          remark: remark,
          member_id: member_id
        }
      ])
      if (error) throw error
      res.json({ message: 'success' })
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  list: async (req, res) => {
    try {
        const token = req.headers['authorization'].replace('Bearer ', '')
        const secret_key = process.env.SECRET_KEY || "defaultSecretKey"
        const payload = jwt.verify(token, secret_key)
        const member_id = payload.id

        const { data: todos, error } = await supabase.from('Todo').select('*').eq('member_id', member_id).order('id', { ascending: false })
        if (error) throw error

        res.json(todos)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { name, remark } = req.body
      const id = parseInt(req.params.id)
      const token = req.headers['authorization'].replace('Bearer ', '')
      const secret_key = process.env.SECRET_KEY || "defaultSecretKey"
      const payload = jwt.verify(token, secret_key)
      const member_id = payload.id

      const { error } = await supabase.from('Todo').update({
        name: name,
        remark: remark
      }).eq('id', id).eq('member_id', member_id)

      if (error) throw error

      res.json({ message: 'success' })
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  remove: async (req, res) => {
      try {
        const id = parseInt(req.params.id)
        const token = req.headers['authorization'].replace('Bearer ', '')
        const secret_key = process.env.SECRET_KEY || "defaultSecretKey"
        const payload = jwt.verify(token, secret_key)
        const member_id = payload.id

        const { error } = await supabase.from('Todo').delete().eq('id', id).eq('member_id', member_id)
        if (error) throw error

        res.json({ message: 'success' })
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  },

  updateStatus: async (req, res) => {
    try {
      const { status } = req.body
      const id = parseInt(req.params.id)
      const token = req.headers['authorization'].replace('Bearer ', '')
      const secret_key = process.env.SECRET_KEY || "defaultSecretKey"
      const payload = jwt.verify(token, secret_key)
      const member_id = payload.id

      const { error } = await supabase.from('Todo').update({
        status: status
      }).eq('id', id).eq('member_id', member_id)

      if (error) throw error

      res.json({ message: 'success' })
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  filter: async (req, res) => {
    try {
      const status = req.params.status
      const token = req.headers['authorization'].replace('Bearer ', '')
      const secret_key = process.env.SECRET_KEY || "defaultSecretKey"
      const payload = jwt.verify(token, secret_key)
      const member_id = payload.id

      let query = supabase.from('Todo').select('*').eq('member_id', member_id).order('id', { ascending: false })

      if (status != 'all') {
        if (status == 'wait') {
          query = query.eq('status', 'use')
        } else {
          query = query.eq('status', status)
        }
      }

      const { data: todos, error } = await query
      if (error) throw error

      res.json(todos)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  dashboard: async (req, res) => {
    try {
      const token = req.headers['authorization'].replace('Bearer ', '')
      const secret_key = process.env.SECRET_KEY || "defaultSecretKey"
      const payload = jwt.verify(token, secret_key)
      const member_id = payload.id

      const { count: countWait, error: err1 } = await supabase.from('Todo').select('*', { count: 'exact', head: true }).eq('status', 'use').eq('member_id', member_id)
      const { count: countDoing, error: err2 } = await supabase.from('Todo').select('*', { count: 'exact', head: true }).eq('status', 'doing').eq('member_id', member_id)
      const { count: countSuccess, error: err3 } = await supabase.from('Todo').select('*', { count: 'exact', head: true }).eq('status', 'success').eq('member_id', member_id)

      if (err1 || err2 || err3) throw (err1 || err2 || err3)

      res.json({
        countWait: countWait || 0,
        countDoing: countDoing || 0,
        countSuccess: countSuccess || 0
      })
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = TodoController