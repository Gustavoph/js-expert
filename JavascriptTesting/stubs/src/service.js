const https = require('https');

class Service {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, response => {
        response.on('data', data => resolve(JSON.parse(data)))
        response.on('error', reject)
      })
    })
  }

  async getPeoples(url) {
    const result = await this.makeRequest(url)

    return {
      name: result.name,
      gender: result.gender,
      birth_year: result.birth_year
    }
  }
};

module.exports = Service;
