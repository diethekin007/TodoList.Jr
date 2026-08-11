const supabase = require('../lib/supabase')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const MemberController = {
    signup: async (req, res) => {
        try {
            const { name, username, password } = req.body
            if (!username || !password) {
                return res.status(400).json({ error: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' })
            }

            const { data: existingUser, error: findError } = await supabase.from('Member').select('username').eq('username', username).single()
            if (existingUser) {
                return res.status(400).json({ error: 'ชื่อผู้ใช้นี้มีในระบบแล้ว' })
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const { data: newMember, error: createError } = await supabase.from('Member').insert([
                {
                    name: name || username,
                    username: username,
                    password: hashedPassword
                }
            ]).select().single()

            if (createError) throw createError
            res.json(newMember)
        } catch (err) {
            console.error('Signup error:', err)
            res.status(500).json({ error: err.message || 'Server error' });
        }
    },

    signin: async (req, res) => {
        try {
            const { username, password } = req.body

            const { data: findUser, error } = await supabase.from('Member').select('id, password').eq('username', username).single()

            if (!findUser) return res.status(401).json({ message: 'unauthorized' })

            const compare = await bcrypt.compare(password, findUser.password)
            if (!compare) return res.status(401).json({ message: 'unauthorized' })

            const secret_key = process.env.SECRET_KEY || "defaultSecretKey"
            const payload = { id: findUser.id }
            const options = { expiresIn: '1d' }

            const token = jwt.sign(payload, secret_key, options)

            res.json({ token })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },

    info: async (req, res) => {
        try {
            const token = req.headers['authorization'].replace('Bearer ', '')
            const secret_key = process.env.SECRET_KEY || "defaultSecretKey"
            const payload = jwt.verify(token, secret_key)
            const member_id = payload.id

            const { data: member, error } = await supabase.from('Member').select('name, username').eq('id', member_id).single()
            if (error) throw error

            res.json(member)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },

    update: async (req, res) => {
        try {
            const { name, username, password } = req.body
            const token = req.headers['authorization'].replace('Bearer ', '')
            const secret_key = process.env.SECRET_KEY || "defaultSecretKey"
            const payload = jwt.verify(token, secret_key)
            const member_id = payload.id

            const { data: oldMember, error: findError } = await supabase.from('Member').select('password').eq('id', member_id).single()
            if (findError) throw findError

            const hashedPassword = await bcrypt.hash(password, 10)

            const { error: updateError } = await supabase.from('Member').update({
                name: name,
                username: username,
                password: password == '' ? oldMember.password : hashedPassword
            }).eq('id', member_id)

            if (updateError) throw updateError

            res.json({ message: 'success' })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err.message })
        }
    }
}

module.exports = MemberController