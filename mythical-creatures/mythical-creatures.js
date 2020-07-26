const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

const features = [
   { id: 1, name: 'swimming' },
   { id: 2, name: 'running' },
   { id: 3, name: 'attacking' },
   { id: 4, name: 'protecting'},
   { id: 5, name: 'being invisible' }
];

const mythical-creatures = [
   {
       id: 1,
       type: 'mermaid',
       displayName: 'Ariel',
       features: [1, 4],
       img: 'fish.jpg',
       busy: false
   },
   {
       id: 2,
       type: 'centaur',
       displayName: 'Zerrn',
       features: [2, 5],
       img: 'horse.jpg',
       busy: false
   },
   {
       id: 3,
       type: 'minotaur',
       displayName: 'Minotaur',
       features: [3, 2],
       img: 'bull.jpg',
       busy: false
   },
   {
       id: 4,
       type: 'garuda',
       displayName: 'Garuda Dev',
       features: [1, 5],
       img: 'bird.jpg',
       busy: false
   }
];

app.get('/mythical-creatures', (req, res) => {
   console.log('Returning mythical-creatures list');
   res.send(mythical-creatures);
});

app.get('/features', (req, res) => {
   console.log('Returning features list');
   res.send(features);
});

app.post('/mythical-creature/**', (req, res) => {
   const creatureId = req.params[0];
   const foundCreature = mythical-creatures.find(subject => subject.id == creatureId);

   if (foundCreature) {
       for (let attribute in foundCreature) {
           if (req.body[attribute]) {
               foundCreature[attribute] = req.body[attribute];
               console.log(`Set ${attribute} to ${req.body[attribute]} in creature: ${creatureId}`);
           }
       }
       res.status(202).header({Location: `http://localhost:${port}/creature/${foundCreature.id}`}).send(foundCreature);
   } else {
       console.log(`Mythical-creature not found.`);
       res.status(404).send();
   }
});

app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Mythical-creatures service listening on port ${port}`);
app.listen(port);

