const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.json())




app.get('/api/animals', (req, res) => {

    // load animals from json
    const animals_path = path.join(__dirname, '/animals.json');
    const fs = require('fs');
    const animals = JSON.parse(fs.readFileSync(animals_path, 'utf8'));

    res.json(animals);
});

app.post('/api/animals/create', (req, res) => {

    console.log(req.body);
    console.log('create animal');
    const animals_path = path.join(__dirname, '/animals.json');
    const fs = require('fs');
    const animals = JSON.parse(fs.readFileSync(animals_path, 'utf8'));

    const animal = req.body;
    animal.id = animals.length + 1;
    animals.push(animal);

    console.log(animals)

    fs.writeFileSync(animals_path, JSON.stringify(animals));

    res.json({
        message: 'Animal created successfully'
    });
});


app.put('/api/animals/edit', (req, res) => {



    console.log(req.body);

    const animals_path = path.join(__dirname, '/animals.json');

    const fs = require('fs');
    const animals = JSON.parse(fs.readFileSync(animals_path, 'utf8'));

    // const animal = animals.find(animal => animal.id === req.body.i);
    const animal = animals[req.body.index]

    const editedAnimal = req.body.animal;
    animal.name = editedAnimal.name;
    animal.age = editedAnimal.age;
    animal.species = editedAnimal.species;
    animal.description = editedAnimal.description;

    animals[req.body.index] = animal;

    console.log(animals, req.body.index, animal)



    fs.writeFileSync(animals_path, JSON.stringify(animals));

    res.json({
        success: true,
    })

});

app.delete('/api/animals/detele', (req, res) => {

    console.log(req.body);

    const animals_path = path.join(__dirname, '/animals.json');

    const fs = require('fs');
    const animals = JSON.parse(fs.readFileSync(animals_path, 'utf8'));

    const index = req.body.index;
    animals.splice(index, 1);

    fs.writeFileSync(animals_path, JSON.stringify(animals));

    res.json({
        success: true,
        animals: animals,
    })

});





app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/create.html'));
});

app.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/edit.html'));
});


const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
