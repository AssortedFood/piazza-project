import jsonwebtoken from 'jsonwebtoken'

function auth(req,res,next){
    const token = req.header('auth-token')
    if(!token) {
        return res.status(401).send({message:'Access denied.'})
    }
    try {
        const verified = jsonwebtoken.verify(token,process.env.TOKEN_SECRET)
        req.user=verified
        next()
    } catch (err){
        console.error('Auth error.\nInvalid token: ', err.message);
        return res.status(403).send({message:'Invalid token.'})
    }
}

export default auth;