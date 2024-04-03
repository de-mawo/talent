import {pool} from "./utils/postgres.js"

export const getMenus = (req, res) => {
    pool.query('SELECT * FROM "Menu"', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }



   