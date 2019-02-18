const path = './';
const fs = require('fs');

const projects = {};

try {

    fs.readdirSync(path).forEach(dir => {

        if (dir.includes('.')) return;

        fs.readdirSync(`${path}${dir}/`).forEach(file => {

            if (file !== 'index.html') return;

            const link = `./${dir}/index.html`;

            projects[dir] = link;
        });
    });

} catch (err) {
    console.error(err);
}

try {

    fs.writeFileSync(`${path}/projects.json`, JSON.stringify(projects));

} catch (err) {
    console.error(err);
}
