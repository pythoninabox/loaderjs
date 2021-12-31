var NwBuilder = require('nw-builder')
var nw = new NwBuilder({
    files: ['src/*', './*.json', './*.html', 'fonts/**/**', '!*.js'], // use the glob format
    platforms: ['linux64'],
    version: '0.50.3',
    flavor: 'normal',
    cacheDir: '../'
})

// Log stuff you want
nw.on('log', console.log)

nw.build().then(function() {
    console.log('all done!')
}).catch(function(error) {
    console.error(error)
})