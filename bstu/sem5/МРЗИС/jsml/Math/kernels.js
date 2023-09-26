const nj = require('numjs')

const linear_kernel = () => {
    return function(x, y) {
        return nj.dot(nj.transpose(x), y)
    }
}

 module.exports = {
    linear_kernel
 }