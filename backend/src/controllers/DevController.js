const axios = require('axios')
const parseStringAsArray = require('../utils/parseStringAsArray')
const Dev = require('../models/Dev')
const { findConnections, sendMessage } = require('../websocket')

module.exports = {
    async store(req, res){
        const { github_username, techs, latitude, longitude } = req.body
        
        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const techsArray = parseStringAsArray(techs)
        
            const response = await axios.get(`https://api.github.com/users/${github_username}`)
            
            const { name = login, bio, avatar_url } = response.data
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            
            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            })

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }

        return res.json(dev)
        
    },

    async destroy(req, res) {
        const { id } = req.params

        await Dev.findByIdAndDelete(id)

        return res.send()
    },

    async index(req, res){
        const devs = await Dev.find()
        
        return res.json(devs)
    }
}