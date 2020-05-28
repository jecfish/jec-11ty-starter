module.exports = {
  replaceExtension: function (file, extension) {  
    return file.replace(/([^\.]*)$/, extension);
  },
}
