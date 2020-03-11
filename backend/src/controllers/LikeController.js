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

    // Se ID do Dev que curtiu, estiver no array 'like' do dev curtido, deu Match
    if (targetDev.likes.includes(loggedDev._id)) {
      console.log('DEU MATCH');
    }

    // Adiciona ID do Dev que recebeu "curtir" em Likes do Dev Logado
    loggedDev.likes.push(targetDev._id);
    
    // Salva no Mongo
    await loggedDev.save();

    return res.json({ ok: true });
  }
};