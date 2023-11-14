'use strict'

const { watch, promises: { readFile }, read } = require('fs')

class File {
  watch(event, filename) {
    this.showContent(filename)
  }

  async showContent(filename) {
    const content = await readFile(filename)
    console.log(content.toString())
  }
}

const file = new File()
// watch(__filename, file.watch.bind(file))

file.watch.call({ showContent: () => console.log('Call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('Call: hey sinon!') }, [null, __filename])

