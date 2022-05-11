#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const {default: Ajv} = require('ajv')
const fg = require('fast-glob')

const schema = require('../data/schema.json')

const ROOT_DIR = path.resolve(__dirname, '..')
const UTF_8 = {encoding: 'utf-8'}

async function main(){

  const files = await listFiles()
  
  const results = await validateFiles(files)

  const success = results.checks.every(check => check.ok)

  if(success){
    sendSuccess(JSON.stringify(results, null, 2))
  } else {
    sendError(`Error: Validation did not pass\n\n${JSON.stringify(results, null, 2)}`)
  }
}

main()

async function listFiles(){
  const pattern = path.resolve(ROOT_DIR, 'data', '**', '*.json')
  const files = await fg(pattern, {
    // don't include directories in results
    onlyFiles: true,
    // create absolute filesystem paths
    absolute: true,
    // do not include schema.json file
    ignore: ['**/schema.json'],
  })

  console.log(files)
  
  return files
}

async function validateFiles(files){
  /**
   * @type {{ checks: Array<{ file: string; ok: boolean; err?: string[] }> }}
   */
  const results = {
    checks: [],
  }

  
  const promises = files.map(async (filepath) => {
    
    const ajv = new Ajv()
    const validate = ajv.compile(schema)

    let check = {
      filepath,
      ok: false,
      err: []
    }

    try{
      const contents = await fs.promises.readFile(filepath, UTF_8)
      const json = JSON.parse(contents)
      const isValid = await validate(json)
    
      check.ok = isValid;
    } catch (e){
      check.err.push(JSON.stringify(e, null, 2))
    }

    if(validate.errors){
      check.err.push(validate.errors)
    }
    
    results.checks.push(check)
  })

  await Promise.all(promises)

  return results
}

function sendSuccess(msg){
  process.stdout.write(`\n${msg}\n`)
  process.exit(0)
}

function sendError(msg, err){
  process.stdout.write(`\n${msg}\n`)
  if(err){
    process.stdout.write(`${JSON.stringify(err, null, 2)}`)
  }
  process.exit(1)
}
