import { v4 as uuidv4 } from 'uuid';
import {pool} from "./utils/postgres.js"

export const getUsers = (req, res) => {
    pool.query('SELECT * FROM "User"', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }


  export const getUserById = (req, res) => {
    const id = req.params.id
  
    pool.query('SELECT * FROM "User" WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }
  
  export const createUser = (req, res) => {
    const { name, email } = req.body
    const id = uuidv4()
  
    pool.query('INSERT INTO "User" (id, name, email) VALUES ($1, $2, $3)', [id, name, email], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results);
      res.status(201).send(`User added with ID: ${results.id}`)
    })
  }
  
  export const updateUser = (req, res) => {
    const id = req.params.id
    const { name, email, image, phone, address } = req.body
  
    pool.query(
      'UPDATE "User" SET name = $1, email = $2, image = $3, phone = $4, address = $5 WHERE id = $6',
      [name, email, image, phone, address, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  
  export const deleteUser = (req, res) => {
    const id = req.params.id
  
    pool.query('DELETE FROM "User" WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
  }

   