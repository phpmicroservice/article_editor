var Quill = require('quill/dist/quill.js')
  var Link = Quill.import('formats/link');
  class FileBlot extends Link {  // 继承Link Blot
    static create(value) {
      let node = undefined
      if (value&&!value.href){  // 适应原本的Link Blot
        node = super.create(value);  
      }
      else{  // 自定义Link Blot
        node = super.create(value.href);  
        node.setAttribute('download', true);  // 左键点击即下载
        node.innerText = value.innerText;
      }
      return node;
    }
  }
  FileBlot.blotName = 'link';
  FileBlot.tagName = 'A';
  Quill.register(FileBlot);
