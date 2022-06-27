#!/usr/bin/env node

import path from 'path'
import fs from 'fs'
import Ajv from 'ajv'
import fg from 'fast-glob'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '..')
const UTF_8 = { encoding: 'utf-8' }

async function main() {
  // generate list of folders
  const folders = await listFoldersWithSchemas()

  // generate array of results
  const results = []

  for (let i = 0; i < folders.length; i++) {
    // validate files and return results
    const { files, schema } = folders[i]
    const validation = await validateFiles(files, schema)

    // concatenate to array
    results.push(...validation.checks)
  }

  // check that each entry has a status prop set to "pass"
  const success = results.every((check) => check.status === 'pass')

  await printValidationResults(results)

  // if successful, print results
  // otherwise, print error
  if (success) {
    sendSuccess()
  } else {
    sendError()
  }
}

main()

async function printValidationResults(checks) {
  // chalk is a Pure ESM module and we can not use "require" to import it
  // https://github.com/chalk/chalk/issues/543#issuecomment-1086050224
  const chalk = (await import('chalk')).default

  const checkCount = checks.length

  const failCount = checks.filter(
    (check) => check.status !== 'pass'
  ).length

  checks.forEach((check) => {
    const isError = check.status !== 'pass'
    const textColor = isError ? '#B22B2D' : '#666666'

    // chalk'd strings
    const status = chalk
      .hex('#000000')
      .bgHex(isError ? '#B22B2D' : '#5ABF3C')
      .bold(` ${check.status.toUpperCase()} `)
    const filepath = chalk.hex(textColor)(check.filepath)
    const err = chalk.hex('#DDDDDD')(
      check.err.map((e) => `${' '.repeat(7)}• ${e}`).join('\n')
    )

    process.stdout.write(`${status} ${filepath}`)
    process.stderr.write(`\n`)
    if (isError) {
      process.stderr.write(err)
      process.stderr.write(`\n`)
    }
    process.stderr.write(`\n`)
  })

  const summary = chalk.bold(
    `${checkCount} files scanned, ${failCount} errors found.`
  )

  process.stdout.write(summary)
  process.stderr.write(`\n\n`)

  return
}

async function listFoldersWithSchemas() {
  const output = []

  const folderPattern = path.resolve(ROOT_DIR, 'data', '*')
  const folders = await fg(folderPattern, {
    // only folders
    onlyFiles: false,
    deep: 1,
    absolute: true,
  })

  for (let i = 0; i < folders.length; i++) {
    const folderPath = folders[i]

    const files = await listFiles(folderPath)
    const [schema, err] = await parseSchema(folderPath)

    if (err) {
      console.log(err)
    } else {
      output.push({
        files,
        schema,
      })
    }
  }

  // array of {files, schema}
  return output
}

async function listFiles(folderPath) {
  const filesPattern = path.resolve(folderPath, '*.json')

  const files = await fg(filesPattern, {
    onlyFiles: true,
    absolute: true,
  })

  return files.filter((filepath) => {
    const isSchema = new RegExp('_schema.json').test(filepath)
    return !isSchema
  })
}

async function parseSchema(folderPath) {
  let schema, err

  try {
    const schemaPath = path.resolve(folderPath, '_schema.json')
    const schemaBuffer = await fs.promises.readFile(schemaPath, UTF_8)
    schema = JSON.parse(schemaBuffer)
  } catch (e) {
    err = JSON.stringify(e)
  }

  return [schema, err]
}

async function validateFiles(files, schema) {
  /**
   * @type {{ checks: Array<{ file: string; status: "pass" | "fail"; err?: string[] }> }}
   */
  const results = {
    checks: [],
  }

  const promises = files.map(async (filepath) => {
    const ajv = new Ajv()
    const validate = ajv.compile(schema)

    let check = {
      filepath,
      status: 'fail',
      err: [],
    }

    try {
      const contents = await fs.promises.readFile(filepath, UTF_8)
      const json = JSON.parse(contents)
      const isValid = await validate(json)

      check.status = isValid ? 'pass' : 'fail'
    } catch (e) {
      check.err.push(e.message)
    }

    if (validate.errors) {
      const messages = validate.errors.map((err) => {
        return `${err.instancePath} - ${err.message}`
      })
      check.err.push(...messages)
    }

    results.checks.push(check)
  })

  await Promise.all(promises)

  return results
}

function sendSuccess() {
  process.exit(0)
}

function sendError() {
  process.exit(1)
}
