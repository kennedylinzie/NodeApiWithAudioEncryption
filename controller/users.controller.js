const pool = require("../database/index")
const createFolder = require("../fileman/filemanager")
const fs = require('fs');


const usersController = {
    getAll: async (req, res) =>{
        try{
          
            const [rows,fields] = await pool.query("SELECT users.uu_id, users.First_name, users.Last_name, users.age,users.studycode, GROUP_CONCAT(audiofiles.path) AS audio_paths FROM users INNER JOIN audiofiles ON users.uu_id = audiofiles.user_id GROUP BY users.uu_id;")
            res.json({
                data: rows
            })
        }catch(error){
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    // getAll: async (req, res) =>{
    //     try{
    //        // const sql = "SELECT users.id, users.First_name, users.Last_name, users.age,users. GROUP_CONCAT(recordings.audio_path) AS audio_paths FROM users INNER JOIN recordings ON users.id = recordings.user_id WHERE users.id = 16 GROUP BY users.id;";
    //         const [rows,fields] = await pool.query("select * from users")
    //         res.json({
    //             data: rows
    //         })
    //     }catch(error){
    //         console.log(error)
    //         res.json({
    //             status: "error"
    //         })
    //     }
    // },
    getById:async (req, res) =>{
        try{
            const { uu_id } = req.params
            const [rows, fields] = await pool.query(`SELECT users.uu_id, users.First_name, users.Last_name, users.age,users.studycode, GROUP_CONCAT(audiofiles.path) AS audio_paths FROM users INNER JOIN audiofiles ON users.uu_id = audiofiles.user_id WHERE users.uu_id = '${[uu_id]}' GROUP BY users.uu_id;`)
            res.json({
                data: rows
            })
        }catch(error){
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try{
            const {First_name, Last_name, age} = req.body
            const sql = "insert into users (First_name,Last_name,age) values (?,?,?)"
            const [rows, fields] = await pool.query(sql,[First_name, Last_name, age])

            res.json({
                status: "success"
            });

        }catch(error){
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    update: async (req, res) => {
        try{
            const {First_name, Last_name, age,uu_id} = req.body
            const sql = "update users set First_name = ?, Last_name = ?, age = ? where uu_id = ?"
            const [rows, fields] = await pool.query(sql,[First_name, Last_name, age, uu_id])
            res.json({
                status: "success"
            })
        }catch(error){
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    delete: async (req, res) => {
        try{
            const { uu_id }  = req.params
            const [rows, fields] = await pool.query("delete from users where uu_id = ?",[uu_id])
            res.json({
                status: "success"
            });
        }catch(error){
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    uploadfile: async (req, res) => {
        try {
            // Decode the base64 encoded audio file content
            const audioBuffer = Buffer.from(req.body.audio, 'base64');
            
            // Generate a unique filename for the uploaded file
            const filename = `${Date.now()}.mp3`;
            const userfolder = req.body.studycode;
    
            // Specify the destination file path where the uploaded file will be saved
            const filePath = `./audiofiles/${userfolder}/${filename}`;
    
            // Write the file to the specified destination
            fs.writeFile(filePath, audioBuffer, async function(err) {
                if (err) throw err;
                console.log("File uploaded successfully");
    
                try {
                    const sql = "INSERT INTO audiofiles (path, user_id) VALUES (?, ?)";
                    const [rows, fields] = await pool.query(sql, [filePath, req.body.user_id]);
    
                    console.log("Database entry created successfully");
    
                    // Respond with a success status
                    res.json({
                        status: "success"
                    });
                } catch (error) {
                    console.log(error);
                    res.json({
                        status: "error"
                    });
                }
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
    assigncode: async (req, res) => {
        try{
            const {studycode,uu_id} = req.body
            const sql = "update users set studycode = ? where uu_id = ?"
            const [rows, fields] = await pool.query(sql,[studycode, uu_id])
            res.json({
                status: "success"
            })
            

            ///////////////
            const directoryPath = './audiofiles'

            // Check if the directory already exists
            if (!fs.existsSync(directoryPath)) {
              fs.mkdirSync(directoryPath);
            }
          
            // Check if the folder already exists
            const folderPath = `${directoryPath}/${studycode}`
            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath);
              console.log(`Folder "${studycode}" created successfully.`)
            } else {
              console.log(`Folder "${studycode}" already exists.`)
            }
            ///////////////
            

        }catch(error){
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    

}

module.exports = usersController