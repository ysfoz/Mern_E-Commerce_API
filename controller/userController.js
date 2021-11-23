
exports.getTest = (req,res) => {
    res.send("test succuss")
}

exports.postTest = (req,res)=> {
    const username = req.body.username
    res.send(username)
}