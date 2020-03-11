const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    console.log(req.params.devId);
    console.log(req.headers.user);

    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    // Se Id curtido for inexistente, retorn msg, e erro 400
    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    // Adiciona ID do Dev que recebeu "curtir" em Dislikes do Dev Logado
    loggedDev.dislikes.push(targetDev._id);
    
    // Salva no Mongo
    await loggedDev.save();

    return res.json({ ok: true });
  }
};