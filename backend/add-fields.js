const fs = require('fs').promises

async function start() {
  let file = await fs.readFile('./countries-original.json', 'utf-8')
  file = JSON.parse(file)
  const newFile = []

  file.countries.forEach(country => {
    const id = country.name.common
      .toLocaleLowerCase()
      .replace(' ', '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    newFile.push({ id, favorite: false, ...country })
  })

  fs.writeFile(
    './countries-new.json',
    JSON.stringify({ countries: [...newFile] }, null, 2)
  )
}

start()
