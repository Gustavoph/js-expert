'use strict'

const {
  watch,
  promises: { readFile },
} = require('node:fs')
const path = require('node:path')
const fs = require('node:fs')

class File {
  watch(event, filename) {
    console.log('this', this)
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    try {
      const filePath = path.resolve(__dirname, filename)
      const content = await readFile(filePath)
      console.log(content.toString())
    } catch (err) {
      console.error('Erro ao ler o arquivo:', err)
    }
  }
}

const file = new File()
const filePath = path.resolve(__dirname, '07-this-bind-call-apply.js')

// Verifique se o arquivo existe antes de assistir
fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error('Arquivo não encontrado:', filePath)
  } else {
    // Use bind para garantir que o contexto 'this' da instância da classe File seja preservado
    // bind retorna uma função com o 'this' que você setou

    watch(filePath, file.watch.bind(file))

    file.watch.call(
      { showContent: () => console.log('Call: hey sinon!') },
      null,
      __filename,
    )

    file.watch.apply({ showContent: () => console.log('Apply: hey sinon!') }, [
      null,
      __filename,
    ])
  }
})
