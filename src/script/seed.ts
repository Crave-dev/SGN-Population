import { insertPopulations } from "@/db"
import { promises as fs } from "fs"

(async function() {
    console.log('start insert populations.')
    const file = await fs.readFile(process.cwd() + '/src/script/populations.json', 'utf-8')
    const data = await JSON.parse(file) as { 'Country name': string; 'Year': number; 'Population': number }[]
    const parsed = data.map((raw) => ({
        country_name: raw?.["Country name"],
        population: raw?.['Population']?.toString(),
        year: raw?.['Year']
    }))
    const res = await insertPopulations(parsed)
    console.log(`insert ${res.length}populations success.`)
    process.exit()
})()