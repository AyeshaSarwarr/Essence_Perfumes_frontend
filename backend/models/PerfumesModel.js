const pool = require('../db')

const getPerfumes = async () => {
    try {
        const result = await pool.query("Select * from perfumes");
        return result.rows
    } catch (error) {
        throw error
    }
}

const createPerfume = async (name, stockQuantity, price, gender, sizeMl, pictureUrl) => {
    
    try {        
        const result = await pool.query("Insert into perfumes (name, stock_qty, price, gender, size_ml, picture_url) values ($1, $2, $3, $4, $5 ,$6) returning *",[name, stockQuantity, price, gender, sizeMl, pictureUrl]);
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

const updatePerfume = async (name, stockQuantity, price, gender, sizeMl, pictureUrl, id) => {
    try {
        const result = await pool.query("Update perfumes set name=$1, stock_qty=$2, price=$3, gender=$4, size_ml=$5 , picture_url=$6 where id=$7 returning *",[name, stockQuantity, price, gender, sizeMl, pictureUrl, id]);
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

const deletePerfume = async (id) => {
    try {
        const result = await pool.query("Delete from perfumes where id=$1 returning *",[id]);
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

const getLimitedPerfumes = async (limit) => {
    try {
        const result = await pool.query("Select * from perfumes limit $1",[limit]);
        return result.rows
    } catch (error) {
        throw error
    }
}

const getPerfumeById = async (id) => {
    try {
        const result = await pool.query("Select * from perfumes where id=$1",[id]);
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

module.exports = {getPerfumes, createPerfume, updatePerfume, deletePerfume, getLimitedPerfumes, getPerfumeById}