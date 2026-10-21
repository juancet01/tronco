import mysql from 'mysql2/promise'
export async function conectar(){
    try{
        const bdd= await mysql.createPool({
            host:'localhost',
            database:'ruiz_bd',
            user:'root',
            password:'Kapejo250830'
        })
        console.log('conectado')
        return bdd;
        
    }catch(error){
        console.log('error al conectar la base de datos')}
}